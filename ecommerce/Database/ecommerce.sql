USE master
GO

DROP DATABASE ecommerce
GO

CREATE DATABASE ecommerce
GO

USE ecommerce
GO

CREATE TABLE dbo.products (
	productId INT PRIMARY KEY CLUSTERED NOT NULL IDENTITY(1, 1),
	activeId BIT NOT NULL DEFAULT(1),
	creationDate DATETIME NOT NULL DEFAULT(GETDATE()),
	[image] VARCHAR(255),
	[description] TEXT,
	price FLOAT,
	discount FLOAT
);

CREATE TABLE dbo.users (
	userId INT PRIMARY KEY CLUSTERED NOT NULL IDENTITY(1, 1),
	activeId BIT NOT NULL DEFAULT(1),
	creationDate DATETIME NOT NULL DEFAULT(GETDATE()),
	emailAddress VARCHAR(255),
	[password] VARCHAR(255),
	firstName VARCHAR(255),
	lastName VARCHAR(255),
);

INSERT INTO dbo.users (emailAddress, password, firstName, lastName) VALUES ('maximoo2004@gmail.com', 'test', 'Max', 'Churchill');

CREATE TABLE dbo.stock (
	stockId INT PRIMARY KEY CLUSTERED NOT NULL IDENTITY(1, 1),
	activeId BIT NOT NULL DEFAULT(1),
	creationDate DATETIME NOT NULL DEFAULT(GETDATE()),
	productId INT NOT NULL FOREIGN KEY (productId) REFERENCES dbo.products(productId) ON DELETE CASCADE,
	restockDate DATETIME,
	currentStock INT
);


CREATE TABLE dbo.productReview (
	productReviewId INT PRIMARY KEY CLUSTERED NOT NULL IDENTITY(1, 1),
	activeId BIT NOT NULL DEFAULT(1),
	creationDate DATETIME NOT NULL DEFAULT(GETDATE()),
	productId INT NOT NULL FOREIGN KEY (productId) REFERENCES dbo.products(productId) ON DELETE CASCADE,
	userId INT NOT NULL FOREIGN KEY (userId) REFERENCES dbo.users(userId) ON DELETE CASCADE,
	price INT,
	[description] TEXT
);

CREATE TABLE dbo.category (
	categoryId INT PRIMARY KEY CLUSTERED NOT NULL IDENTITY(1, 1),
	activeId BIT NOT NULL DEFAULT(1),
	creationDate DATETIME NOT NULL DEFAULT(GETDATE()),
	[name] TEXT,
	productId INT NOT NULL FOREIGN KEY (productId) REFERENCES dbo.products(productId) ON DELETE CASCADE,
);

CREATE TABLE dbo.paymentDetails (
	paymentDetailsId INT PRIMARY KEY CLUSTERED NOT NULL IDENTITY(1, 1),
	activeId BIT NOT NULL DEFAULT(1),
	creationDate DATETIME NOT NULL DEFAULT(GETDATE()),
	userId INT NOT NULL FOREIGN KEY (userId) REFERENCES dbo.users(userId) ON DELETE CASCADE,
	cardNumber VARCHAR(255)
);