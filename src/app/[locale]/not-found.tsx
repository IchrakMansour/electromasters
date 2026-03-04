import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="text-center">
          <p className="text-7xl font-bold text-primary-500">404</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{t("description")}</p>
          <div className="mt-8">
            <Button href="/">{t("backHome")}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
