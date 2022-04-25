import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as aci from "@pulumi/azure-native/containerinstance";

const contactPerson = "My name"
const resourceGroupName = "rg-demo-2"
const tags = {
    "Contactperson": contactPerson
}

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("rg",
    { 
        resourceGroupName,
        tags 
    }, {
        protect: true,
    });

// create an Azure Container Instance with Grafana image
const containerGroup = new aci.ContainerGroup("containerGroup", {
    containerGroupName: "grafana-demo",
    containers: [{
        command: [],
        environmentVariables: [],
        image: "grafana/grafana-oss",
        name: "grafana",
        ports: [{
            port: 3000,
        }],
        resources: {
            requests: {
                cpu: 1,
                memoryInGB: 1.5,
            },
        }
    }],
    tags,
    ipAddress: {
        dnsNameLabel: "grafana-demo-1",
        ports: [{
            port: 3000,
            protocol: "TCP",
        }],
        type: "Public",
    },
    osType: "Linux",
    resourceGroupName: resourceGroup.name
});
