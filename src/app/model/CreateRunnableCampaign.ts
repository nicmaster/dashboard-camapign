export interface CreateRunnableCampaign {
    campaignId: number;
    scheduleCampaignId: number;
    campaignDesc: string;
    campaignName: string;
    audienceId: number;
    platformId: number;
    templateId: number;
    campaignType: string;
    fileName: string;
  }