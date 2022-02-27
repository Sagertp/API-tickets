CREATE DATABASE ticketsAp;

USE ticketsApp;

CREATE TABLE type_user (
  id_type_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL
);

CREATE TABLE user (
  id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_type_user INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  FOREIGN KEY (id_type_user) REFERENCES type_user (id_type_user)
);

CREATE TABLE ticket (
  id_ticket INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description VARCHAR(255)
);

CREATE TABLE ticketOrder (
  id_order INT AUTO_INCREMENT PRIMARY KEY,
  id_ticket INT,
  id_user INT,
  FOREIGN KEY (id_ticket) REFERENCES ticket(id_ticket),
  FOREIGN KEY (id_user) REFERENCES user(id_user)
);

INSERT INTO type_user (id_type_user, name) VALUES 
(1, "administrator"),
(2, "user");

INSERT INTO user (id_user, id_type_user, email, name, password) VALUES
(1, 1, "administrador@smartcode.com", "Administrador", "$2a$10$vA0XQA3uFtQROU3cHJhHNu19G4G1IM8k1tx0GmRotvwAQ7rMTEp96"),
(2, 2, "usuario1@ticketsapp.com", "Usuario 1", "$2a$10$pSGuoDMBhc68jz2MXH95M.AiVXHndndbAfgz7jEp.sypMT7iX.JfO"),
(3, 2, "usuario2@ticketsapp.com", "Usuario 2", "$2a$10$Pey2MRIpzcl3B3ppztlWnO52KEWcpNSKt6Vx2qt8NGtXqlhUIO4cq");

INSERT INTO ticket (id_ticket, name, description) VALUES 
(1, "Intall", "Intallation of internet service."), 
(2, "Support", "Solve internet service failure."),
(3, "Support", "Solve firewall failure."),
(4, "Intall", "Installation of CCTV equipament.");

INSERT INTO ticketOrder (id_order, id_ticket, id_user) VALUES
(1, 1, 2),
(2, 2, 2),
(3, 3, 3),
(4, 4, 3);
