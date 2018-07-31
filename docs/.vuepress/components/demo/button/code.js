export const basic = `
  <co-button type="primary">Primary</co-button>
  <co-button>Default</co-button>
  <co-button type="dashed">Dashed</co-button>
  <co-button type="danger">Danger</co-button>
`;

export const icon = `
  <co-button type="primary" shape="circle" icon="search" />
  <co-button type="primary" icon="search">Search</co-button>
  <co-button shape="circle" icon="search" />
  <co-button icon="search">Search</co-button>
  <co-button type="dashed" shape="circle" icon="search" />
  <co-button type="dashed" icon="search">Search</co-button>
`;

export const disabled = `
  <co-button type="primary">Primary</co-button>
  <co-button type="primary" disabled>Primary(disabled)</co-button>
  <br />
  <co-button>Default</co-button>
  <co-button disabled>Default(disabled)</co-button>
  <br />
  <co-button type="dashed">Dashed</co-button>
  <co-button type="dashed" disabled>Dashed(disabled)</co-button>
  <br />
  <div style="padding: 8px 8px 0 8px;background: rgb(190, 200, 200);">
    <co-button ghost>Ghost</co-button>
    <co-button ghost disabled>Ghost(disabled)</co-button>
  </div>
`;

export const loading = `
  <template>
    <div>
      <co-button type="primary" loading>Loading</co-button>
      <co-button type="primary" size="small" loading>Loading</co-button>
      <co-button shape="circle" loading />
      <co-button type="primary" shape="circle" loading />
      <co-button type="primary" :loading="loading" @click.native="enterLoading">Click me!</co-button>
      <co-button type="primary" icon="poweroff" :loading="iconLoading" @click.native="enterIconLoading">Click me!</co-button>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        loading: false,
        iconLoading: false,
      };
    },
    methods: {
      enterLoading() {
        this.loading = true;
      },
      enterIconLoading() {
        this.iconLoading = true;
      },
    },
  };
  </script>
`;

export const ghost = `
  <div style="background: rgb(190, 200, 200);padding: 26px 16px 14px;">
    <co-button type="primary" ghost>Primary</co-button>
    <co-button ghost>Default</co-button>
    <co-button type="dashed" ghost>Dashed</co-button>
    <co-button type="danger" ghost>Danger</co-button>
  </div>
`;

export const group = ``;
