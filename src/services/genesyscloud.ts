import platformClient from 'purecloud-platform-client-v2';
import config from '@/config/config';

const usersApi = new platformClient.UsersApi();
const groupsApi = new platformClient.GroupsApi();
const architectApi = new platformClient.ArchitectApi();

export default {
  async loginImplicitGrant(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);
    const environment = urlParams.get('environment') || localStorage.getItem('gc-environment') || 'mypurecloud.de';
    const client = platformClient.ApiClient.instance;

    client.setPersistSettings(true, 'agent-monitoring-app');
    client.setEnvironment(environment);
    localStorage.setItem('gc-environment', environment);

    await client.loginImplicitGrant(config.clientId, config.redirectUri);

    console.log('Authenticated');
  },

  async getMe(): Promise<platformClient.Models.UserMe> {
    const opts: platformClient.UsersApi.getUsersMeOptions = { expand: ['groups'] };
    const data = await usersApi.getUsersMe(opts);
    return data;
  },

  async getAllGroups(): Promise<platformClient.Models.Group[] | undefined> {
    const opts: platformClient.GroupsApi.getGroupsOptions = { pageSize: 500 };
    const data = await groupsApi.getGroups(opts);
    return data.entities;
  },

  async getDataTableRow<T>(datatableId: string, rowId: string): Promise<T> {
    const opts: platformClient.ArchitectApi.getFlowsDatatableRowOptions = { showbrief: false };
    const data = (await architectApi.getFlowsDatatableRow(datatableId, rowId, opts)) as T;
    return data;
  }
};
