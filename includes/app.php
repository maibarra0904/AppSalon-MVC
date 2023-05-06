<?php 

require 'funciones.php';
require 'database.php';
require __DIR__ . '/../vendor/autoload.php';

// Conectarnos a la base de datos
use Model\ActiveRecord;
ActiveRecord::setDB($db);

use Dotenv\Dotenv as Dot;
$dotenv = Dot::createImmutable(__DIR__);
$dotenv->safeLoad();