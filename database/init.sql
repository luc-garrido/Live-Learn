-- USERS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TRACKS
CREATE TABLE IF NOT EXISTS tracks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL,
    conteudo TEXT,

    CONSTRAINT fk_tracks_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- MODULES
CREATE TABLE IF NOT EXISTS modules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    track_id INTEGER NOT NULL,
    user_id UUID NOT NULL,
    order_index INTEGER,

    CONSTRAINT fk_modules_track
        FOREIGN KEY (track_id)
        REFERENCES tracks(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_modules_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- VIDEOS
CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    title VARCHAR(255),
    module_id INTEGER NOT NULL,

    CONSTRAINT fk_videos_module
        FOREIGN KEY (module_id)
        REFERENCES modules(id)
        ON DELETE CASCADE
);

-- CONTENTS
CREATE TABLE IF NOT EXISTS contents (
    id SERIAL PRIMARY KEY,
    path TEXT NOT NULL,
    title VARCHAR(255),
    module_id INTEGER NOT NULL,

    CONSTRAINT fk_contents_module
        FOREIGN KEY (module_id)
        REFERENCES modules(id)
        ON DELETE CASCADE
);

-- ACTIVITIES
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    module_id INTEGER NOT NULL,
    answered BOOLEAN DEFAULT FALSE,
    answers JSONB,

    CONSTRAINT fk_activities_module
        FOREIGN KEY (module_id)
        REFERENCES modules(id)
        ON DELETE CASCADE
);

-- CREATE INDEX idx_tracks_user_id ON tracks(user_id);
-- CREATE INDEX idx_modules_track_id ON modules(track_id);
-- CREATE INDEX idx_modules_user_id ON modules(user_id);
-- CREATE INDEX idx_videos_module_id ON videos(module_id);
-- CREATE INDEX idx_contents_module_id ON contents(module_id);
-- CREATE INDEX idx_activities_module_id ON activities(module_id);
