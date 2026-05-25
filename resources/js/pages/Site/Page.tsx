import { SiteLayout } from '@/components/site/SiteLayout';
import { PageBlocks } from '@/components/site/PageBlocks';

interface Block { id: number; block_type: string; content: any; position: number; is_visible: boolean; }

export default function Page({ 
  blocks, 
  slug, 
  services, 
  pricing_plans,
  team_members,
  clients,
  portfolios,
  case_studies
}: { 
  blocks: Block[]; 
  slug: string; 
  services?: any[]; 
  pricing_plans?: any[];
  team_members?: any[];
  clients?: any[];
  portfolios?: any[];
  case_studies?: any[];
}) {
  return (
    <SiteLayout>
      <PageBlocks 
        blocks={blocks} 
        services={services} 
        pricing_plans={pricing_plans}
        team_members={team_members}
        clients={clients}
        portfolios={portfolios}
        case_studies={case_studies}
      />
    </SiteLayout>
  );
}
