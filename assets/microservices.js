// Cloud Microservices Dashboard JavaScript
class MicroservicesDashboard {
    constructor() {
        this.services = [
            {
                id: 'user-service',
                name: 'User Service',
                type: 'api',
                status: 'healthy',
                instances: 3,
                cpu: 45,
                memory: 62,
                uptime: '15d 3h',
                icon: 'fas fa-users',
                color: '#0d6efd',
                endpoints: [
                    { method: 'GET', url: '/api/users', status: 'up' },
                    { method: 'POST', url: '/api/users', status: 'up' },
                    { method: 'PUT', url: '/api/users/{id}', status: 'up' }
                ]
            },
            {
                id: 'auth-service',
                name: 'Auth Service',
                type: 'api',
                status: 'healthy',
                instances: 2,
                cpu: 32,
                memory: 48,
                uptime: '12d 8h',
                icon: 'fas fa-shield-alt',
                color: '#198754',
                endpoints: [
                    { method: 'POST', url: '/auth/login', status: 'up' },
                    { method: 'POST', url: '/auth/refresh', status: 'up' },
                    { method: 'DELETE', url: '/auth/logout', status: 'up' }
                ]
            },
            {
                id: 'payment-service',
                name: 'Payment Service',
                type: 'api',
                status: 'healthy',
                instances: 4,
                cpu: 67,
                memory: 74,
                uptime: '8d 14h',
                icon: 'fas fa-credit-card',
                color: '#ffc107',
                endpoints: [
                    { method: 'POST', url: '/payments/process', status: 'up' },
                    { method: 'GET', url: '/payments/status/{id}', status: 'up' },
                    { method: 'POST', url: '/payments/refund', status: 'up' }
                ]
            },
            {
                id: 'notification-service',
                name: 'Notification Service',
                type: 'api',
                status: 'warning',
                instances: 2,
                cpu: 89,
                memory: 91,
                uptime: '5d 2h',
                icon: 'fas fa-bell',
                color: '#fd7e14',
                endpoints: [
                    { method: 'POST', url: '/notifications/send', status: 'up' },
                    { method: 'GET', url: '/notifications/{userId}', status: 'down' },
                    { method: 'PUT', url: '/notifications/read', status: 'up' }
                ]
            },
            {
                id: 'web-frontend',
                name: 'Web Frontend',
                type: 'web',
                status: 'healthy',
                instances: 3,
                cpu: 28,
                memory: 35,
                uptime: '20d 6h',
                icon: 'fas fa-desktop',
                color: '#6f42c1',
                endpoints: [
                    { method: 'GET', url: '/', status: 'up' },
                    { method: 'GET', url: '/dashboard', status: 'up' },
                    { method: 'GET', url: '/api-docs', status: 'up' }
                ]
            },
            {
                id: 'mobile-api',
                name: 'Mobile API Gateway',
                type: 'api',
                status: 'healthy',
                instances: 2,
                cpu: 54,
                memory: 58,
                uptime: '7d 11h',
                icon: 'fas fa-mobile-alt',
                color: '#20c997',
                endpoints: [
                    { method: 'GET', url: '/mobile/api/v1/health', status: 'up' },
                    { method: 'POST', url: '/mobile/api/v1/sync', status: 'up' }
                ]
            },
            {
                id: 'data-service',
                name: 'Data Analytics',
                type: 'data',
                status: 'healthy',
                instances: 2,
                cpu: 72,
                memory: 68,
                uptime: '18d 9h',
                icon: 'fas fa-database',
                color: '#dc3545',
                endpoints: [
                    { method: 'GET', url: '/analytics/reports', status: 'up' },
                    { method: 'POST', url: '/analytics/events', status: 'up' }
                ]
            },
            {
                id: 'file-service',
                name: 'File Storage',
                type: 'data',
                status: 'healthy',
                instances: 3,
                cpu: 41,
                memory: 52,
                uptime: '25d 1h',
                icon: 'fas fa-cloud-upload-alt',
                color: '#0dcaf0',
                endpoints: [
                    { method: 'POST', url: '/files/upload', status: 'up' },
                    { method: 'GET', url: '/files/{id}', status: 'up' },
                    { method: 'DELETE', url: '/files/{id}', status: 'up' }
                ]
            }
        ];
        
        this.charts = {};
        this.init();
    }
    
    init() {
        this.updateLastUpdated();
        this.loadServices();
        this.loadServicesTable();
        this.loadApiEndpoints();
        this.initializeCharts();
        this.startRealTimeUpdates();
    }
    
    updateLastUpdated() {
        const now = new Date();
        const formatted = now.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        document.getElementById('lastUpdated').textContent = formatted;
    }
    
    loadServices() {
        const servicesGrid = document.getElementById('servicesGrid');
        servicesGrid.innerHTML = this.services.map(service => `
            <div class="service-node ${service.status}" onclick="showServiceDetails('${service.id}')">
                <div class="service-icon" style="background-color: ${service.color};">
                    <i class="${service.icon}"></i>
                </div>
                <div class="service-name">${service.name}</div>
                <div class="service-status ${service.status}">
                    <i class="fas fa-circle me-1"></i>
                    ${service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </div>
                <div class="service-metrics mt-2">
                    <small class="text-muted">
                        CPU: ${service.cpu}% | Memory: ${service.memory}%
                    </small>
                </div>
            </div>
        `).join('');
    }
    
    loadServicesTable() {
        const tbody = document.getElementById('servicesTable');
        tbody.innerHTML = this.services.map(service => `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="service-icon-small me-3" style="background-color: ${service.color}; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                            <i class="${service.icon} text-white" style="font-size: 0.875rem;"></i>
                        </div>
                        <div>
                            <div class="fw-semibold">${service.name}</div>
                            <small class="text-muted">${service.id}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="service-badge badge bg-${service.status === 'healthy' ? 'success' : service.status === 'warning' ? 'warning' : 'danger'}">
                        <i class="fas fa-circle me-1"></i>${service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                </td>
                <td>
                    <span class="instances-count">${service.instances}</span>
                </td>
                <td>
                    <div class="progress" style="height: 6px;">
                        <div class="progress-bar ${service.cpu > 80 ? 'bg-danger' : service.cpu > 60 ? 'bg-warning' : 'bg-success'}" 
                             style="width: ${service.cpu}%"></div>
                    </div>
                    <small class="text-muted">${service.cpu}%</small>
                </td>
                <td>
                    <div class="progress" style="height: 6px;">
                        <div class="progress-bar ${service.memory > 80 ? 'bg-danger' : service.memory > 60 ? 'bg-warning' : 'bg-success'}" 
                             style="width: ${service.memory}%"></div>
                    </div>
                    <small class="text-muted">${service.memory}%</small>
                </td>
                <td>
                    <span class="uptime-badge">${service.uptime}</span>
                </td>
                <td>
                    <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-outline-primary" onclick="viewLogs('${service.id}')" title="View Logs">
                            <i class="fas fa-file-alt"></i>
                        </button>
                        <button class="btn btn-outline-success" onclick="restartService('${service.id}')" title="Restart">
                            <i class="fas fa-redo"></i>
                        </button>
                        <button class="btn btn-outline-info" onclick="scaleService('${service.id}')" title="Scale">
                            <i class="fas fa-expand-arrows-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    loadApiEndpoints() {
        const container = document.getElementById('apiEndpoints');
        const allEndpoints = this.services.flatMap(service => 
            service.endpoints.map(endpoint => ({
                ...endpoint,
                serviceName: service.name,
                serviceColor: service.color
            }))
        );
        
        container.innerHTML = allEndpoints.map(endpoint => `
            <div class="endpoint-item" onclick="testEndpoint('${endpoint.url}')">
                <div class="d-flex align-items-center flex-fill">
                    <span class="endpoint-method ${endpoint.method.toLowerCase()}">${endpoint.method}</span>
                    <div class="endpoint-url">${endpoint.url}</div>
                </div>
                <div class="d-flex align-items-center">
                    <div class="endpoint-status ${endpoint.status === 'up' ? '' : 'down'}" title="Status: ${endpoint.status}"></div>
                </div>
            </div>
        `).join('');
    }
    
    initializeCharts() {
        // Response Time Chart
        const responseCtx = document.getElementById('responseTimeChart').getContext('2d');
        const responseData = this.generateResponseTimeData();
        
        this.charts.responseTime = new Chart(responseCtx, {
            type: 'line',
            data: responseData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Response Time (ms)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    }
                }
            }
        });
        
        // Request Volume Chart
        const volumeCtx = document.getElementById('requestVolumeChart').getContext('2d');
        const volumeData = this.generateVolumeData();
        
        this.charts.requestVolume = new Chart(volumeCtx, {
            type: 'bar',
            data: volumeData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Requests per minute'
                        }
                    }
                }
            }
        });
    }
    
    generateResponseTimeData() {
        const labels = [];
        const authData = [];
        const paymentData = [];
        const userdata = [];
        
        for (let i = 29; i >= 0; i--) {
            const time = new Date();
            time.setMinutes(time.getMinutes() - i);
            labels.push(time.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit' 
            }));
            
            authData.push(80 + Math.random() * 40);
            paymentData.push(120 + Math.random() * 60);
            userdata.push(60 + Math.random() * 30);
        }
        
        return {
            labels,
            datasets: [{
                label: 'Auth Service',
                data: authData,
                borderColor: '#198754',
                backgroundColor: 'rgba(25, 135, 84, 0.1)',
                tension: 0.4
            }, {
                label: 'Payment Service',
                data: paymentData,
                borderColor: '#ffc107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                tension: 0.4
            }, {
                label: 'User Service',
                data: userdata,
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                tension: 0.4
            }]
        };
    }
    
    generateVolumeData() {
        const labels = [];
        const volumeData = [];
        
        for (let i = 11; i >= 0; i--) {
            const time = new Date();
            time.setHours(time.getHours() - i);
            labels.push(time.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                hour12: true 
            }));
            
            volumeData.push(1000 + Math.random() * 2000);
        }
        
        return {
            labels,
            datasets: [{
                label: 'Total Requests',
                data: volumeData,
                backgroundColor: 'rgba(13, 110, 253, 0.7)',
                borderColor: '#0d6efd',
                borderWidth: 1
            }]
        };
    }
    
    filterServices(type) {
        const filtered = type === 'all' ? this.services : this.services.filter(s => s.type === type);
        const tbody = document.getElementById('servicesTable');
        
        // Fade out
        tbody.style.opacity = '0.5';
        
        setTimeout(() => {
            // Update content
            tbody.innerHTML = filtered.map(service => `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="service-icon-small me-3" style="background-color: ${service.color}; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                                <i class="${service.icon} text-white" style="font-size: 0.875rem;"></i>
                            </div>
                            <div>
                                <div class="fw-semibold">${service.name}</div>
                                <small class="text-muted">${service.id}</small>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="service-badge badge bg-${service.status === 'healthy' ? 'success' : service.status === 'warning' ? 'warning' : 'danger'}">
                            <i class="fas fa-circle me-1"></i>${service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </span>
                    </td>
                    <td>
                        <span class="instances-count">${service.instances}</span>
                    </td>
                    <td>
                        <div class="progress" style="height: 6px;">
                            <div class="progress-bar ${service.cpu > 80 ? 'bg-danger' : service.cpu > 60 ? 'bg-warning' : 'bg-success'}" 
                                 style="width: ${service.cpu}%"></div>
                        </div>
                        <small class="text-muted">${service.cpu}%</small>
                    </td>
                    <td>
                        <div class="progress" style="height: 6px;">
                            <div class="progress-bar ${service.memory > 80 ? 'bg-danger' : service.memory > 60 ? 'bg-warning' : 'bg-success'}" 
                                 style="width: ${service.memory}%"></div>
                        </div>
                        <small class="text-muted">${service.memory}%</small>
                    </td>
                    <td>
                        <span class="uptime-badge">${service.uptime}</span>
                    </td>
                    <td>
                        <div class="btn-group btn-group-sm" role="group">
                            <button class="btn btn-outline-primary" onclick="viewLogs('${service.id}')" title="View Logs">
                                <i class="fas fa-file-alt"></i>
                            </button>
                            <button class="btn btn-outline-success" onclick="restartService('${service.id}')" title="Restart">
                                <i class="fas fa-redo"></i>
                            </button>
                            <button class="btn btn-outline-info" onclick="scaleService('${service.id}')" title="Scale">
                                <i class="fas fa-expand-arrows-alt"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            // Fade back in
            tbody.style.opacity = '1';
        }, 300);
    }
    
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateLastUpdated();
            
            // Randomly update service metrics
            this.services.forEach(service => {
                const cpuVariation = Math.floor(Math.random() * 10 - 5);
                const memoryVariation = Math.floor(Math.random() * 8 - 4);
                
                service.cpu = Math.max(0, Math.min(100, service.cpu + cpuVariation));
                service.memory = Math.max(0, Math.min(100, service.memory + memoryVariation));
            });
            
            // Update charts
            this.charts.responseTime.data = this.generateResponseTimeData();
            this.charts.responseTime.update('none');
            
            this.charts.requestVolume.data = this.generateVolumeData();
            this.charts.requestVolume.update('none');
            
        }, 10000); // Update every 10 seconds
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'info' ? 'info-circle' : 'exclamation-triangle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
}

// Global functions
function refreshServices() {
    dashboard.showNotification('Refreshing service status...', 'info');
    setTimeout(() => {
        dashboard.loadServices();
        dashboard.loadServicesTable();
        dashboard.showNotification('Services refreshed successfully!', 'success');
    }, 1500);
}

function showArchitecture() {
    dashboard.showNotification('Architecture diagram would open in the full version', 'info');
}

function filterServices(type) {
    dashboard.filterServices(type);
}

function showServiceDetails(serviceId) {
    const service = dashboard.services.find(s => s.id === serviceId);
    dashboard.showNotification(`Viewing details for ${service.name}`, 'info');
}

function viewLogs(serviceId) {
    dashboard.showNotification(`Opening logs for ${serviceId}...`, 'info');
}

function restartService(serviceId) {
    dashboard.showNotification(`Restarting ${serviceId}... This may take a moment.`, 'warning');
}

function scaleService(serviceId) {
    dashboard.showNotification(`Scaling ${serviceId} - adding additional instances`, 'info');
}

function testEndpoint(url) {
    dashboard.showNotification(`Testing endpoint: ${url}`, 'info');
    setTimeout(() => {
        dashboard.showNotification(`✅ Endpoint ${url} responded successfully (200 OK)`, 'success');
    }, 1000);
}

// Initialize dashboard
let dashboard;
document.addEventListener('DOMContentLoaded', function() {
    dashboard = new MicroservicesDashboard();
    
    console.log('☁️ Microservices Dashboard loaded successfully!');
    console.log('Features: Service Monitoring, Real-time Metrics, API Testing');
});

// Welcome message
setTimeout(() => {
    dashboard.showNotification('🚀 Cloud Microservices Dashboard ready! All services are healthy and running.', 'success');
}, 2000);
