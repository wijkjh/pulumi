# Pulumi examples for Azure

## Getting started
See also the [tutorial on get started with Azure](https://www.pulumi.com/docs/get-started/azure/).

1. First step is always [installing Pulumi](../../README.md). Then configure Pulumi to access your Microsoft Azure account.
2. Authentication can be done using a user account or a service principal which has the correct access rights to deploy and manage your Azure resources.
3. The easy way to start locally is by using a user account and use the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) to authencicate with Azure.
4. When you want to use a service principal, you need create one if not yet done and obtain three important tokens:
   - `appId` - this is the client ID
   - `password` - this is the client secret
   - `tenant` - this is the tenant ID
   
   Make the tokens available to Pulumi by using configuration:
   ```bash
   pulumi config set azure-native:clientId <clientID>
   pulumi config set azure-native:clientSecret <clientSecret> --secret
   pulumi config set azure-native:tenantId <tenantID>
   pulumi config set azure-native:subscriptionId <subscriptionId>
   ```
   
   Or use environment variables: `ARM_CLIENT_ID`, `ARM_CLIENT_SECRET`, `ARM_TENANT_ID`, and `ARM_SUBSCRIPTION_ID`.

   See also [Azure Native Provider setup](https://www.pulumi.com/registry/packages/azure-native/installation-configuration/).

### Example using Typescript
- Open a terminal window and navigate to a folder in which you want to create your Pulumi Project.
- Login into your Azure account using `az login`. If you multiple Azure accounts connected, then use `az login --tenant <tenant name>.onmicrosoft.com`
- Type: `pulumi new azure-typescript`
- Enter your Pulumi access token or enter to login in using the browser if asked or create an account if you have not done yet
- Enter the default Azure region, e.g. `westeurope`. Use `az account list-locations --output table` to list all available locations.
- You can change the region for your stack by using the `pulumi config set` command:
  ```bash
  pulumi config set azure-native:location westeurope
  ```
  The default location is saved in the file `Pulumi.<stack name>.yaml`.
- A default example is created in which a resourcegroup and storage account is created.
- Just try a run `pulumi up` to see what will be created
- Choose to show the details at the question "Do you want to perform this update?". This will show you what is actually created when you select "yes". As the default program does not provide a name for both resource group as for the storage account, a name will be generated. The generated name is prefixed with the Pulumi resource name.
If you want to override this behaviour, you need to provide more details. Look it up in de documentation: [ResourceGroup](https://www.pulumi.com/registry/packages/azure-native/api-docs/resources/resourcegroup/) and [StorageAccount](https://www.pulumi.com/registry/packages/azure-native/api-docs/storage/storageaccount/).
- If you provide an already existing resource, like the resourcegroup, the deployment will fail, because the resourcegroup is nnot yet in the stack, so it will try to create it.
  You can use `pulumi import` to import an existing resource into the stack, e.g.: 
  ```bash
  pulumi import azure-native:resources:ResourceGroup <name of Pulumi resource in the program> /subscriptions/<subscriptionId>/resourceGroups/<name of existing resourcegroup>
   ```
- If set the code correctly after the import, you will be able to perform a `pulumi up`.
- Note that you can not delete a protected resource. If you use the same resourcegroup in multiple projects and remove the delete protection, then a single `pulumi destroy` in one project could lead to the entire resource group beining deleted. So either do not share resource groups over multiple projects or keep the resource group out of the projects.
