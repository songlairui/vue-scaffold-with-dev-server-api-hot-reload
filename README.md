# with-api-hot-reload

> add custom api to vue/cli dev-server

> then get them hot reload

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Demo action

click `request` button  
 will send a request and add a trace  
Click `change` button  
then `save` button  
then re-click `request` button  
will see the response data changes responsing to the changement above

### key files

[vue.config.js](./vue.config.js)
add devServer#before configuration

[server.js](./server.js)  
place require in the middleware  
reach hot reload with delete require.cache

## To Be

- [ ] an example for **Architectural visualization**

Anti 996 License Version 1.0 (Draft)
