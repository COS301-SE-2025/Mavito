-- Table: users

-- DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'linguist', 'researcher', 'contributor')), -- roles are suject to change
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_verified BOOLEAN DEFAULT FALSE,
    profile_pic_url TEXT,

	-- added security features
	-- we could add a token for password reset
	-- account locking
	-- account verfication token
);

CREATE TABLE user_languages (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- for automatic delete
    language_code CHAR(3) NOT NULL CHECK (language_code IN (
        'afr', 'eng', 'zul', 'xho', 'nso', 'sot', 
        'tsn', 'ssw', 'ven', 'tso', 'nde', 'other'
    )),
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
    PRIMARY KEY (user_id, language_code)
);

--performance related indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

