

-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS use_languages;
-- DROP TABLE IF EXISTS languages;

-- Table: languages 
CREATE TABLE languages (
    code CHAR(3) PRIMARY KEY,
    name VARCHAR(50) NOT NULL, --Zulu ,Xhosa, etc...
    native_name VARCHAR(50), --isiZulu, isiXhosa, etc...
    is_active BOOLEAN DEFAULT TRUE --is this langauge removed from our dataset? 
);

-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('linguist', 'researcher', 'contributor')), -- roles are subject to change
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_verified BOOLEAN DEFAULT FALSE, --email verified therefore account verfied
    profile_pic_url TEXT,

	-- added security features
    password_reset_token VARCHAR(255),-- we could add a token for password reset
    verification_token VARCHAR(255),	-- account verification token
    account_locked BOOLEAN DEFAULT FALSE,-- account locking
    failed_login_attempts INTEGER DEFAULT 0,
    deleted_at TIMESTAMP WITH TIME ZONE -- can help with recovering deleted accounts, if its less than 30 days old we can recover accound-delete user data after 30 days of delete
);

-- Table: users_languages -languages teh user is proficient in and teh levels
CREATE TABLE user_languages (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- for automatic delete
    language_code CHAR(3) REFERENCES languages(code) ON UPDATE CASCADE,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5), -- how good is user at lanaguage?,can be used to value contributions
    is_primary BOOLEAN DEFAULT FALSE, --primary language- users expert language
    PRIMARY KEY (user_id, language_code)
);


-- Table: users_search_history -what has the user been looking for?
CREATE TABLE user_search_history (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    language_code CHAR(3) NOT NULL REFERENCES languages(code) ON UPDATE CASCADE,
    result_count INTEGER,
    expires_at TIMESTAMP WITH TIME ZONE 
        GENERATED ALWAYS AS (timestamp + INTERVAL '180 days') STORED --store searches for 3 months
);

-- Table: users_preferences -customization decisions made by user
CREATE TABLE user_preferences (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    dark_mode BOOLEAN DEFAULT FALSE,
    offline_mode_enabled BOOLEAN DEFAULT FALSE,
    ui_language CHAR(3) DEFAULT 'eng' REFERENCES languages(code) ON UPDATE CASCADE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- performance-related indexes
-- create index for faster history retrieval
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_user_languages_user ON user_languages(user_id);
CREATE INDEX idx_user_languages_lang ON user_languages(language_code);
CREATE INDEX idx_user_search_history ON user_search_history(user_id, timestamp DESC);
CREATE INDEX idx_search_history_expiry ON user_search_history(expires_at);
CREATE INDEX idx_user_preferences_user ON user_preferences(user_id);