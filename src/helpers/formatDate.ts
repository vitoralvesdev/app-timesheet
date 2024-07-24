import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const dateToText = (date: string): string => {
  if (!date) {
    return "";
  }

  return format(date, "dd MMMM yyyy", { locale: ptBR });
};

export { dateToText };
