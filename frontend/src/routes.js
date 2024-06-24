const apiPath = 'api/v1';

const apiPaths = {
  origin: () => apiPath,
  register: () => [apiPath, 'register'].join('/'),
  login: () => [apiPath, 'login'].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
  channels: () => [apiPath, 'channels'].join('/'),
};

const appPaths = {
  home: () => '/',
  login: () => '/login',
  register: () => '/register',
  notFound: () => '*',
};

export { apiPaths, appPaths };
