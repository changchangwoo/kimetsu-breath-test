import { breathingColors, breathingNames } from "@/constants/breathingColors";
import { Ttypes } from "@/models/type";
import { Section01 } from "@/components/results/Section01";
import { Section02 } from "@/components/results/Section02";
import { ResultContent } from "@/components/results/ResultContent";
import resultDetail from "@/data/result_script.json";

interface PageProps {
  params: Promise<{ type: Ttypes }>; 
}

export default async function ResultPage({ params }: PageProps) {
  const { type } = await params;
  
  const breathingColor = breathingColors[type];
  const breathingName = breathingNames[type];
  const breathingDetail = resultDetail[type];

  return (
    <main>
      <ResultContent
        firstSection={
          <Section01
            type={type}
            breathingColor={breathingColor}
            breathingName={breathingName}
          />
        }
        secondSection={
          <Section02
            type={type}
            breathingColor={breathingColor}
            breathingDetail={breathingDetail}
            breathingName={breathingName}
          />
        }
      ></ResultContent>
    </main>
  );
}