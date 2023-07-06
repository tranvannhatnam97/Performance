# RUN k6 with environment

## local

```bash
k6 run -e DOMAIN_BFF=http://localhost:7064 -e DOMAIN_IDENTITY=https://localhost:5000 -e DOMAIN_ORG=http://localhost:3000 .\createWorkspace.js
```

## testing

```bash
k6 run -e DOMAIN_BFF=https://test-api.ichiba.net -e DOMAIN_IDENTITY=https://test-id.ichiba.net -e DOMAIN_ORG=https://test-org.ichiba.net .\createWorkspace.js
```

# Run without environment

```bash
k6 run .\createWorkspace.js
```
