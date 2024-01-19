import { Typography } from "@/shared/components/Typography/Typography";
import { Navbar } from "@/widgets/Navbar";
import { TemplatesFilters } from "./Filter/TemplatesFilters";
import { TemplateCard } from "@/entities/Tempalte";
const Templates = () => {
  return (
    <>
      <Navbar />
      <div className="page">
        <Typography variant="pageTitle">Templates</Typography>
        <Typography className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur.
        </Typography>
        <TemplatesFilters className="mt-2 mb-4" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
        </div>
      </div>
    </>
  );
};

export default Templates;
