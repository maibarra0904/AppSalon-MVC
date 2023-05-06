<?php 
use Dotenv\Dotenv as Dot;
require 'funciones.php';
require 'database.php';
require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dot::createImmutable(__DIR__);
$dotenv->safeLoad();
    

$db = conectarDB();
use Model\ActiveRecord;

ActiveRecord::setDB($db);