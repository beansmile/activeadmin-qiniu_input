The install generator will automatically do these two changes to your files:

1. The following line will be added as the **first** line of `app/assets/stylesheets/active_admin.scss`:

```stylesheet
//= require active_admin/qiniu_input/all
```

2. The following line will be added on `app/assets/javascripts/active_admin.js.coffee` **after** `#= require active_admin/base`

```javascript
#= require active_admin/qiniu_input/all
```

To undo, you can use

```bash
$ rails d active_admin:qiniu_input:install
```

3. An initializer will be added. From there, you can change the default config.
