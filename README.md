# Mavito: A PWA for Multilingual Lexicons, Term Banks, and Glossaries
<p align="center">
    <img src="frontend/public/DFSI_Logo.png" alt="banner"/>
</p>

<div align="center">
<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/figma.png" alt="Figma"/></code><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" alt="Figma"/></code><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" alt="Figma"/></code><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/vite.png" alt="Figma"/></code><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/python.png" alt="Figma"/></code><code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/gcp.png" alt="Figma"/></code>
</div>



## Project Description
**Mavito** is a progressive web application (PWA) developed for the COS 301 Capstone project at the University of Pretoria. It serves as a unified platform for accessing, browsing, and contributing to multilingual glossaries, dictionaries, and terminology banks. Designed with an offline-first approach and scalable architecture, Mavito aims to support South Africa’s low-resource languages and empower linguistic research, NLP development, and language preservation.


---

## Project Resources
* [Functional Requirements (SRS) Document](#)
* [GitHub Project Board](https://github.com/COS301-SE-2025/Mavito/projects)

---

## Git Structure & Branching Strategy

#### **Repository Type**: Monorepo
#### **Structure**:

```
/frontend       → React + TypeScript UI  
/backend        → Python FastAPI backend  
/Documentation  → Design and documentation  
/.github        → GitHub Actions workflows and configuration  
```

#### **GitFlow Branching Model**
  * `main` – Stable, production-ready code
  * `develop` – Active development integration branch
  * `feature/*` – New features and enhancements
  * `release/*` – Pre-release testing and stabilization
  * `hotfix/*` – Critical fixes applied directly to production

This structure ensures clean separation between environments, supports parallel feature development, and maintains a stable deployment process. All code changes are merged into `develop` through pull requests, and releases are carefully tested before merging into `main`.

---

## Velox Team Members

| Name              | Role                        | Student Number | Description                             | LinkedIn                                                                 |
|-------------------|-----------------------------|----------------|--------------------------------------------|--------------------------------------------------------------------------|
| Hayley Dodkins    | Project Manager / DevOps Engineer | 21528790       |  I am a developer passionate about systems programming and distributed systems, with experience working on kernel development and low-level software using Rust and OCaml. I love diving into the inner workings of systems, tackling concurrency challenges, and designing robust backend architectures. I’m always eager to learn, push technical limits, and take on ambitious, deeply technical problems.      | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hayley-dodkins-867126222/) |
| Zainab Abdulrasaq | UI Engineer           | 22566202       | [github.com/abdulrasaqzainab](https://github.com/abdulrasaqzainab)       | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zainab-abdulrasaq) |
| Arnaud Strydom    | Integration Engineer           | 23536013       | [github.com/ArnaudZStrydom](https://github.com/ArnaudZStrydom)       | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arnaud-zander-strydom-44a95a319/) |
| Palesa Thabane    | Services Engineer / Business Analyst           | 21540838       | [github.com/Palesa-Thabane](https://github.com/Palesa-Thabane)       | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/palesa-thabane-943604364/) |
| Eugen Vosloo      | Data Engineer               | 20445696        | [github.com/eugenvosloo](https://github.com/eugenvosloo)         | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/eugen-vosloo-aa2522353/) |

---

## Badges

<p align="center">
  <a href="https://choosealicense.com/licenses/mit/">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"/>
  </a>
  <a href="https://github.com/COS301-SE-2025/Mavito/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/COS301-SE-2025/Mavito/ci.yml?branch=main" alt="Build Status"/>
  </a>
  <a href="https://codecov.io/gh/COS301-SE-2025/Mavito">
    <img src="https://img.shields.io/codecov/c/github/COS301-SE-2025/Mavito" alt="Code Coverage"/>
  </a>
  <a href="https://github.com/COS301-SE-2025/Mavito">
    <img src="https://img.shields.io/badge/requirements-purple" alt="Requirements"/>
  </a>
  <a href="https://github.com/COS301-SE-2025/Mavito/issues">
    <img src="https://img.shields.io/github/issues/COS301-SE-2025/Mavito" alt="GitHub Issues"/>
  </a>
  <a href="https://uptimerobot.com/">
    <img src="https://img.shields.io/uptimerobot/status/m788123456-123456789abcdef" alt="Uptime Robot"/>
  </a>
</p>

