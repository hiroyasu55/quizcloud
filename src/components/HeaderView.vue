<template>
  <header id="header-view">
    <b-navbar toggleable="md" type="dark fixed-top" variant="info">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-link class="navbar-brand" to="/">
        Quiz Cloud
      </b-link>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item>Support</b-nav-item>
          <b-nav-item-dropdown right>
            <template slot="button-content">
              User
            </template>

            <b-dropdown-item to="#">Profile</b-dropdown-item>
            <b-dropdown-item to="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>
<style lang="scss">
header {
  font-size: 1rem;
}
</style>
