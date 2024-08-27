import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const dateToText = (date: string, f?: string): string => {
  if (!date) {
    return "";
  }

  return format(date, f ?? "dd MMMM yyyy", {
    locale: ptBR,
  });
};

export { dateToText };
