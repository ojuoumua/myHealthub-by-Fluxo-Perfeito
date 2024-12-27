/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    'use strict'

    const getStoredTheme = () => localStorage.getItem('theme')
    //console.log("theme: " + getStoredTheme())
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = (theme, focus = false) => {
        a();

        const themeSwitcher = document.querySelector('#bd-theme')

        if (!themeSwitcher) {
            return
        }

        const themeSwitcherText = document.querySelector('#bd-theme-text')
        const activeThemeIcon = document.querySelector('.theme-icon-active')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${(theme == 'dark' || theme == 'light') ? theme : 'light'}"]`)

        if (!btnToActive) {
            return
        }

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.add('opacity-50');
            element.setAttribute('aria-pressed', 'false');
        })

        btnToActive.classList.add('active');
        btnToActive.setAttribute('aria-pressed', 'true');
        btnToActive.classList.remove('opacity-50');

        if (focus) {
            themeSwitcher.focus()
        }
    }

    //window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    //    const storedTheme = getStoredTheme()
    //    if (storedTheme !== 'light' && storedTheme !== 'dark') {
    //        setTheme(getPreferredTheme())
    //    }
    //})

    const a = () => {
        if (getPreferredTheme() == "dark") {
            $("#btnSwitcher i").addClass("fa-toggle-on")
            $("#btnSwitcher i").removeClass("fa-toggle-off")
            //console.log("its dark")
        }
        else {
            $("#btnSwitcher i").addClass("fa-toggle-off")
            $("#btnSwitcher i").removeClass("fa-toggle-on")
            //console.log("its light")
        }
    }

    const loadHeader = () => {
        // Build Header
        document.getElementById('header').classList = 'navbar navbar-expand-lg fixed-top bg-body-tertiary border-bottom';
        document.getElementById('header').innerHTML = `<div class="container-lg">
            <!-- Home -->
            <a class="navbar-brand modak-regular text-success" href="index.html" title="Página Inicial" data-bind="text: displayName""><img data-bind="attr: {src: Logo}" height="25"/></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!--Links-->
                <ul id="showLinks" class="navbar-nav mb-lg-0 d-none" >
                    <li><a id="ver" class="nav-link" aria-current="page" href="ver.html"><i class="fa fa-eye text-success"></i> Ver</a></li>
                    <li><a id="marcar" class="nav-link" aria-current="page" href="marcar.html"><i class="fa fa-plus text-success"></i> Marcar</a></li>
                    <li><a id="comprar" class="nav-link" aria-current="page" href="comprar.html"><i class="fa fa-shopping-cart text-success"></i> Comprar</a></li>
                </ul>
                <hr class="mx-auto"></hr>
                <!--Theme Toggle-->
                <ul class="navbar-nav justify-content-end" id="bd-theme">
                    <!--<li class="nav-item"><div class="nav-link" type="button" data-bs-theme-value="light" aria-pressed="false"><i class="theme-icon fa fa-sun-o"      title="Modo claro" ></i></div></li>-->
                    <li class="nav-item"><div class="nav-link" type="button" id="btnSwitcher" aria-pressed="true"><i class="theme-icon fa fa-toggle-off" title="Mudar tema"></i> Dark Mode</div></li>
                    <!--<li class="nav-item"><div class="nav-link" type="button" data-bs-theme-value="dark"  aria-pressed="false"><i class="theme-icon fa fa-moon-o"     title="Modo escuro"></i></div></li>-->
                </ul>
                <!-- Login -->
                <ul id="showLogin" class="navbar-nav justify-content-end d-none">
                    <li><a id="gotoLogin" href="login.html" class="btn btn-success"><i class="fa fa-sign-in"></i> Login</a></li>
                </ul>
                <!-- Logout -->
                <ul id="showLogout" class="navbar-nav justify-content-end d-none">
                    <li><a id="logout" href="index.html" class="nav-link text-danger"><i class="fa fa-sign-out"></i> Logout</a></li>
                </ul>
            </div>
        </div>`;
       
        //--- Show buttons or login
        if (localStorage.isLogged == 'true') {
            $('#showLinks').removeClass('d-none')
            $('#showLogout').removeClass('d-none')
            $('#showLogin').addClass('d-none')
        } 
        else {
            localStorage.isLogged = 'false'
            $('#showLinks').addClass('d-none')
            $('#showLogout').addClass('d-none')
            $('#showLogin').removeClass('d-none')
        }

        //--- Highlight active page
        var page = window.location.pathname.split('/')[1];
        page = page.substring(0, page.length-5);
        if (['ver','marcar','comprar'].includes(page)) { $('#' + page).addClass('active') }
        console.log(page)
    }

    const loadFooter = () => {
        document.getElementById('footer').classList = "navbar fixed-bottom bg-body-tertiary border-top";
        document.getElementById('footer').innerHTML = `
            <div class="container small">
                <div class="navbar-text">&copy; myHealth'ub 2024</div>
                <div class="navbar-text">Made by Fluxo Perfeito</div>
                <!-- <div class="navbar-nav">
                    <div class="nav-item text-end"><a href="https://www.ua.pt" class="nav-link">Universidade de Aveiro</a></div>
                </div> -->
            </div>`;
    }

    window.addEventListener('DOMContentLoaded', () => {
        loadHeader()
        loadFooter()
        showActiveTheme(getPreferredTheme())
        $('#showLogout').click(function(){
            localStorage.isLogged = 'false'
            delete localStorage.currentUser
        })

        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    setStoredTheme(theme)
                    setTheme(theme)
                    showActiveTheme(theme, true)
                })
            })

        $("#btnSwitcher").click(function () {
            const newTheme = (getPreferredTheme() == "dark") ? "light" : "dark"
            setStoredTheme(newTheme)
            setTheme(newTheme)
            showActiveTheme(newTheme, true)
        })

    })
})()