CREATE DATABASE alsafeer_sqldb;

CREATE TABLE UserRoles (
    RoleId INT PRIMARY KEY IDENTITY,
    RoleName NVARCHAR(50),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT NULL,
	IsActive BIT DEFAULT 1
);

CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY,
    RoleId INT,
	Name NVARCHAR(30),
	Username NVARCHAR(30),
	PasswordHash NVARCHAR(128), 
    IsActive BIT DEFAULT 1,
	CreatedBy INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	UpdatedAt DATETIME NULL,
    UpdatedBy INT NULL,

	FOREIGN KEY (RoleId) REFERENCES UserRoles(RoleId),
);


CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY,
	ProductName NVARCHAR (100),
	Picture NVARCHAR (255),
	QtyInHand INT,
    IsActive BIT DEFAULT 1,
	CreatedBy INT,
	CreatedAt DATETIME2 DEFAULT GETDATE(),
	UpdatedAt DATETIME2 NULL,
    UpdatedBy INT NULL,
);


CREATE TABLE ClientTypes (
    ClientTypeId INT PRIMARY KEY IDENTITY,
	ClientTypeName NVARCHAR(50),
    IsActive BIT DEFAULT 1,
	CreatedBy INT,
	CreatedAt DATETIME2 DEFAULT GETDATE(),
	UpdatedAt DATETIME2 NULL,
    UpdatedBy INT NULL,
);

CREATE TABLE Clients (
    ClientId INT PRIMARY KEY IDENTITY,
	ClientTypeId INT,
	ClientName NVARCHAR(50),
	ClientAddress NVARCHAR(255),
	ClientPhoneNumber NVARCHAR(50),
	ClientEmail NVARCHAR(50),
	ClientCellNumber NVARCHAR(50),
	ClientFax NVARCHAR(50),
    IsActive BIT DEFAULT 1,
	CreatedBy INT,
	CreatedAt DATETIME2 DEFAULT GETDATE(),
	UpdatedAt DATETIME2 NULL,
    UpdatedBy INT NULL,

	FOREIGN KEY (ClientTypeId) REFERENCES ClientTypes(ClientTypeId),
);

CREATE TABLE Invoices (
    InvoiceId INT PRIMARY KEY IDENTITY,
	InvoiceName NVARCHAR(100),
	InvoiceDate DATETIME,
	InvoiceAmount INT,
	ClientId INT,
    IsActive BIT DEFAULT 1,
	CreatedBy INT,
	CreatedAt DATETIME2 DEFAULT GETDATE(),
	UpdatedAt DATETIME2 NULL,
    UpdatedBy INT NULL,

	FOREIGN KEY (ClientId) REFERENCES Clients(ClientId),
);

CREATE TABLE Payments (
    PaymentId INT PRIMARY KEY IDENTITY,
	PaymentType NVARCHAR(100),
	Installment NVARCHAR(50),
	InvoiceId INT,
	ClientId INT,
    IsActive BIT DEFAULT 1,
	CreatedBy INT,
	CreatedAt DATETIME2 DEFAULT GETDATE(),
	UpdatedAt DATETIME2 NULL,
    UpdatedBy INT NULL,

	FOREIGN KEY (InvoiceId) REFERENCES Invoices(InvoiceId),
	FOREIGN KEY (ClientId) REFERENCES Clients(ClientId),
);


CREATE TABLE Shipments (
    ShipmentId INT PRIMARY KEY IDENTITY,
	ClientTypeId INT,
	ShipmentDate DATETIME,
	ShipmentFrom NVARCHAR(30),
	ShipmentTo NVARCHAR(30),
	ShipmentCharges INT,
	ClearanceCharges INT,
	PortCharges INT,
	MiscCharges INT,
	Notes NVARCHAR(255),
    IsActive BIT DEFAULT 1,
	CreatedBy INT,
	CreatedAt DATETIME2 DEFAULT GETDATE(),
	UpdatedAt DATETIME2 NULL,
    UpdatedBy INT NULL,

	FOREIGN KEY (ClientTypeId) REFERENCES ClientTypes(ClientTypeId)
);

CREATE TABLE Orders (
    OrderId INT PRIMARY KEY IDENTITY,
	OrderName NVARCHAR(100),
	OrderDate DATETIME,
	OrderStatus NVARCHAR(50),
	Qty INT,
	Weight NVARCHAR(30),
	ProductId INT,
	ShipmentId INT,
	InvoiceId INT,
	PaymentId INT,
	ClientId INT,
    IsActive BIT DEFAULT 1,
	CreatedBy INT,
	CreatedAt DATETIME2 DEFAULT GETDATE(),
	UpdatedAt DATETIME2 NULL,
    UpdatedBy INT NULL,

	FOREIGN KEY (ProductId) REFERENCES Products(ProductId),
	FOREIGN KEY (ShipmentId) REFERENCES Shipments(ShipmentId),
	FOREIGN KEY (InvoiceId) REFERENCES Invoices(InvoiceId),
	FOREIGN KEY (PaymentId) REFERENCES Payments(PaymentId),
	FOREIGN KEY (ClientId) REFERENCES Clients(ClientId),
);

CREATE TABLE Expenses (
    ExpenseId INT PRIMARY KEY IDENTITY,
	ExpenseType NVARCHAR(100),
	Picture NVARCHAR(255),
	Amount INT,
	Status NVARCHAR (50),
	ClientTypeId INT,
    IsActive BIT DEFAULT 1,
	CreatedBy INT,
	CreatedAt DATETIME2 DEFAULT GETDATE(),
	UpdatedAt DATETIME2 NULL,
    UpdatedBy INT NULL,

	FOREIGN KEY (ClientTypeId) REFERENCES ClientTypes(ClientTypeId),
);

CREATE TABLE Permissions (
    PermissionId INT PRIMARY KEY IDENTITY,
	PermissionKey NVARCHAR(50),
    IsActive BIT DEFAULT 1,
	CreatedBy INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	UpdatedAt DATETIME NULL,
    UpdatedBy INT NULL,
);

CREATE TABLE UserPermissions (
    UserPermissionId INT PRIMARY KEY IDENTITY,
	UserId INT,
	PermissionId INT,
    IsActive BIT DEFAULT 1,
	CreatedBy INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	UpdatedAt DATETIME NULL,
    UpdatedBy INT NULL,

	FOREIGN KEY (UserId) REFERENCES Users(UserId),
	FOREIGN KEY (PermissionId) REFERENCES Permissions(PermissionId),
);


USE [alsafeer_sqldb]
GO

/****** Object:  StoredProcedure [dbo].[GetUserPermissons_st]    Script Date: 11/20/2024 7:50:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetUserPermissons_st]
	-- Add the parameters for the stored procedure here
	@userId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   SELECT 
        p.PermissionId,
        p.PermissionKey,
        p.IsActive,
        up.UserId,
        CASE WHEN up.UserPermissionId IS NOT NULL THEN CAST(1 AS BIT)
        ELSE CAST(0 AS BIT) END AS Allowed
    FROM Permissions p
    LEFT JOIN UserPermissions up ON p.PermissionId = up.PermissionId AND up.UserId = @userId
	where p.IsActive = 1
END
GO

--ALTER QUERIES 9/12/2024

ALTER TABLE Payments
ADD PartialPayment Bit

Exec sp_rename 'Payments.Installment', 'Amount', 'COLUMN'

ALTER TABLE Orders
DROP COLUMN PaymentId, InvoiceId, ShipmentId

ALTER TABLE Payments
ADD OrderId int

ALTER TABLE [Payments]
ADD CONSTRAINT OrderId FOREIGN KEY (OrderId)
REFERENCES [Orders] (OrderId)

ALTER TABLE Invoices
ADD OrderId int

ALTER TABLE [Invoices]
ADD CONSTRAINT OrderIdFK FOREIGN KEY (OrderId)
REFERENCES [Orders] (OrderId)

ALTER TABLE Shipments
ADD OrderId int

ALTER TABLE Shipments
ADD CONSTRAINT OrderIdFKEY FOREIGN KEY (OrderId)
REFERENCES [Orders] (OrderId)

ALTER TABLE Payments
ADD PaymentDate DATETIME2