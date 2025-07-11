USE [alsafeer_sqldb]
GO
SET IDENTITY_INSERT [dbo].[UserRoles] ON 

INSERT [dbo].[UserRoles] ([RoleId], [RoleName], [CreatedAt], [CreatedBy], [UpdatedAt], [UpdatedBy], [IsActive]) VALUES (3, N'Admin', CAST(N'2024-11-07T15:30:18.593' AS DateTime), 3, NULL, NULL, 1)
INSERT [dbo].[UserRoles] ([RoleId], [RoleName], [CreatedAt], [CreatedBy], [UpdatedAt], [UpdatedBy], [IsActive]) VALUES (5, N'User', CAST(N'2024-11-08T00:00:00.000' AS DateTime), 1, NULL, NULL, 1)
SET IDENTITY_INSERT [dbo].[UserRoles] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserId], [RoleId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy], [Username], [Password], [Name]) VALUES (11, 3, 1, 11, CAST(N'2024-11-15T14:47:46.9996240' AS DateTime2), CAST(N'2024-11-20T15:49:03.223' AS DateTime), 14, N'admin@123', N'AQAAAAIAAYagAAAAEBO+C+uPbAcn0dWAVb6ewi5KVzf/x/mkuGK9eniOkpSPAyHfvSMiAI7qGVM2SOi1CQ==', N'Super Admin')
INSERT [dbo].[Users] ([UserId], [RoleId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy], [Username], [Password], [Name]) VALUES (12, 5, 0, 11, CAST(N'2024-11-18T19:58:37.9900000' AS DateTime2), NULL, NULL, N'user', N'User@123', N'User')
INSERT [dbo].[Users] ([UserId], [RoleId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy], [Username], [Password], [Name]) VALUES (13, 5, 0, 11, CAST(N'2024-11-18T20:01:55.4733333' AS DateTime2), NULL, NULL, N'user2', N'User@1234', N'User2')
INSERT [dbo].[Users] ([UserId], [RoleId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy], [Username], [Password], [Name]) VALUES (14, 5, 1, 11, CAST(N'2024-11-20T14:44:09.5613947' AS DateTime2), NULL, NULL, N'sherry', N'AQAAAAIAAYagAAAAEE+cM7pTluC+u8qJtcYzl7tg7AmUehvpZG1Y2YiJHPnwphVTE5QV66pTUYqdJvwnxg==', N'Sherry')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET IDENTITY_INSERT [dbo].[Permissions] ON 

INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (1, N'add-user', 1, 11, CAST(N'2024-11-18T15:25:04.137' AS DateTime), CAST(N'2024-11-20T12:28:56.163' AS DateTime), 11)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (2, N'user-list', 0, 11, CAST(N'2024-11-18T15:26:31.263' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (3, N'add-permission', 1, 11, CAST(N'2024-11-18T15:27:01.797' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (4, N'permission-list', 0, 11, CAST(N'2024-11-18T15:27:14.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (5, N'add-client', 1, 11, CAST(N'2024-11-18T15:27:53.467' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (6, N'add-client-type', 1, 11, CAST(N'2024-11-18T15:28:02.557' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (7, N'client-list', 1, 11, CAST(N'2024-11-18T15:28:12.967' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (8, N'client-type-list', 1, 11, CAST(N'2024-11-18T15:28:22.053' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (9, N'user-permissions', 1, 11, CAST(N'2024-11-18T15:28:48.057' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (10, N'add-product', 1, 11, CAST(N'2024-11-18T15:29:06.373' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (11, N'product-list', 1, 11, CAST(N'2024-11-18T15:29:17.540' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (12, N'shipment-list', 1, 11, CAST(N'2024-11-18T15:29:33.527' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (13, N'order-list', 1, 11, CAST(N'2024-11-18T15:30:05.330' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (14, N'expense-list', 1, 11, CAST(N'2024-11-18T15:30:24.793' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (15, N'payment-list', 1, 11, CAST(N'2024-11-18T15:30:31.030' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (16, N'invoice-list', 1, 11, CAST(N'2024-11-18T15:30:37.453' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (17, N'add-shipment', 1, 11, CAST(N'2024-11-18T15:30:52.387' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (18, N'add-order', 1, 11, CAST(N'2024-11-18T15:31:38.727' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (19, N'add-expense', 1, 11, CAST(N'2024-11-18T15:31:46.137' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (20, N'add-payment', 1, 11, CAST(N'2024-11-18T15:31:53.310' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (21, N'add-invoice', 1, 11, CAST(N'2024-11-18T15:31:59.160' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (22, N'permission-list', 1, 11, CAST(N'2024-11-20T01:46:50.787' AS DateTime), NULL, NULL)
INSERT [dbo].[Permissions] ([PermissionId], [PermissionKey], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (23, N'user-list', 1, 11, CAST(N'2024-11-20T01:47:02.997' AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Permissions] OFF
GO
SET IDENTITY_INSERT [dbo].[UserPermissions] ON 

INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (6, 12, 2, 1, 11, CAST(N'2024-11-18T20:00:27.390' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (7, 12, 4, 1, 11, CAST(N'2024-11-18T20:00:27.400' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (8, 13, 2, 1, 11, CAST(N'2024-11-18T20:02:06.257' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (9, 13, 4, 1, 11, CAST(N'2024-11-18T20:02:06.260' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (48, 11, 1, 1, 11, CAST(N'2024-11-20T07:31:59.070' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (50, 11, 3, 1, 11, CAST(N'2024-11-20T07:31:59.083' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (52, 11, 5, 1, 11, CAST(N'2024-11-20T07:31:59.093' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (53, 11, 6, 1, 11, CAST(N'2024-11-20T07:31:59.097' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (54, 11, 7, 1, 11, CAST(N'2024-11-20T07:31:59.103' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (55, 11, 8, 1, 11, CAST(N'2024-11-20T07:31:59.110' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (56, 11, 9, 1, 11, CAST(N'2024-11-20T07:31:59.113' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (57, 11, 10, 1, 11, CAST(N'2024-11-20T07:31:59.117' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (58, 11, 11, 1, 11, CAST(N'2024-11-20T07:31:59.123' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (59, 11, 12, 1, 11, CAST(N'2024-11-20T07:31:59.127' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (60, 11, 14, 1, 11, CAST(N'2024-11-20T07:31:59.137' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (61, 11, 15, 1, 11, CAST(N'2024-11-20T07:31:59.143' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (62, 11, 16, 1, 11, CAST(N'2024-11-20T07:31:59.147' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (63, 11, 17, 1, 11, CAST(N'2024-11-20T07:31:59.153' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (64, 11, 18, 1, 11, CAST(N'2024-11-20T07:31:59.157' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (65, 11, 19, 1, 11, CAST(N'2024-11-20T07:31:59.160' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (66, 11, 20, 1, 11, CAST(N'2024-11-20T07:31:59.167' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (67, 11, 21, 1, 11, CAST(N'2024-11-20T07:31:59.170' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (68, 11, 22, 1, 11, CAST(N'2024-11-20T07:31:59.177' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (69, 11, 23, 1, 11, CAST(N'2024-11-20T07:31:59.180' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (76, 14, 1, 1, 11, CAST(N'2024-11-20T10:22:08.400' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (77, 14, 3, 1, 11, CAST(N'2024-11-20T10:22:14.823' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (79, 14, 6, 1, 11, CAST(N'2024-11-20T10:23:32.793' AS DateTime), NULL, NULL)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsActive], [CreatedBy], [CreatedAt], [UpdatedAt], [UpdatedBy]) VALUES (80, 11, 13, 1, 11, CAST(N'2024-11-20T10:49:38.320' AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[UserPermissions] OFF
GO
