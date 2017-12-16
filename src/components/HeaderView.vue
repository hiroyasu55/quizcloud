<template>
  <header id="header-view">
    <b-navbar toggleable="md" type="dark fixed-top" variant="info">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-link class="navbar-brand" to="#">
       <span>Quiz Cloud</span>
      </b-link>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item>Support</b-nav-item>
          <b-nav-item>Docs</b-nav-item>
          <b-nav-item>Contact Us</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <span style="font-weight: bold;">User</span>
            </template>

            <b-dropdown-item to="#">Profile</b-dropdown-item>
            <b-dropdown-item to="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>
