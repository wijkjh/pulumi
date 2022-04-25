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
