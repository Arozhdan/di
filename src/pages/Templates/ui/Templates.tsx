import { Typography } from "@/shared/components/Typography/Typography";
import { Navbar } from "@/widgets/Navbar";
import { TemplatesFilters } from "./Filter/TemplatesFilters";
import { TemplateCard } from "@/entities/Tempalte";
import { useTranslation } from "react-i18next";
const Templates = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div className="page">
        <Typography variant="pageTitle">{t("general.templates")}</Typography>
        <Typography className="text-gray-500">
          {t("templates.template_subtitle")}
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
