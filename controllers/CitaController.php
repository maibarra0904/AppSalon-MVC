<?php

namespace Controllers;

use MVC\Router;

class CitaController {
    public static function index(Router $router) {

        //session_start(); //Empieza la sesión
        isAuth(); //Verifica si la sesión está iniciada, si no lo está lo regresa al login

        $router->render('cita/index', [
            'nombre' => $_SESSION['nombre'],
            'id' => $_SESSION['id']
        ]);
    }
}

