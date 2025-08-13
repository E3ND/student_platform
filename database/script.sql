CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    age INT NOT NULL,
    course TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
    deletedAt TIMESTAMP WITH TIME ZONE,
    createdUserId UUID NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (createdUserId) REFERENCES users(id)
);