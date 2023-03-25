const msRestAzure = require('ms-rest-azure');
const ComputeManagementClient = require('azure-arm-compute');

// Azure credentials
const clientId = 'your-client-id';
const secret = 'your-client-secret';
const domain = 'your-tenant-id';
const subscriptionId = 'your-subscription-id';

// Virtual machine configuration
const vmName = 'your-vm-name';
const location = 'your-vm-location';
const username = 'your-vm-username';
const password = 'your-vm-password';
const vmSize = 'your-vm-size';
const osType = 'your-vm-os-type';
const nicId = 'your-vm-nic-id';

// Authenticate with Azure
msRestAzure.loginWithServicePrincipalSecret(clientId, secret, domain, (err, credentials) => {
    if (err) {
        console.log(err);
        return;
    }

    // Create the compute client
    const computeClient = new ComputeManagementClient(credentials, subscriptionId);

    // Define the virtual machine configuration
    const vmConfig = {
        location: location,
        osProfile: {
            computerName: vmName,
            adminUsername: username,
            adminPassword: password
        },
        hardwareProfile: {
            vmSize: vmSize
        },
        storageProfile: {
            imageReference: {
                publisher: 'MicrosoftWindowsServer',
                offer: 'WindowsServer',
                sku: osType,
                version: 'latest'
            }
        },
        networkProfile: {
            networkInterfaces: [
                {
                    id: nicId,
                    primary: true
                }
            ]
        }
    };

    // Create the virtual machine
    computeClient.virtualMachines.createOrUpdate('your-resource-group', vmName, vmConfig, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Virtual machine created:', result);
    });
});
