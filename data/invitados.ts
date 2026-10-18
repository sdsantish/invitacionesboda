export type Invitado = {
  id: string;
  ref: string;
  /* "libre": invitación sin un número fijo de cupos */
  cupos: number | "libre";
};

export const INVITADOS: Invitado[] = [

  { id: "xaji0y6dpbhsahxthv3a3zmf8", ref: "Camilo Andres Cerro Martinez", cupos: 1 },
  { id: "mdd4v30t9nt3w5uzbikcidkwn", ref: "Familia Santis Merlano", cupos: 3 },
  { id: "azytjxepq85jsg65kxvf1t2ta", ref: "Maria Jose Carcamo Buelvas", cupos: 1 },
  { id: "la753lc58drc11ertj5pht0hl", ref: "Andres David Sanchez Estrada", cupos: 1 },
  { id: "9xpseimvihcwi64ciyhe7ur23", ref: "Mis Papitos Manuel y Johana", cupos: 2 },
  { id: "874frhocn9j2qp89uzfk8ut0c", ref: "Familia Gonzalez Hernandez", cupos: 4 },
  { id: "6t4ufel6246hid25owf75935a", ref: "Familia Zuñiga Camargo", cupos: 3 },
  { id: "cxll4zklookep7y6wktakpuxq", ref: "Jasmith Contreras", cupos: 1 },
  { id: "phr62gdswm31yihair4cowgzr", ref: "Familia Gonzalez Martinez", cupos: 3 },
  { id: "6vz41nam148p0tvhhpbmyofqe", ref: "Familia Jaimes Estrada", cupos: 5 },
  { id: "dzr1yxr2dhylurtp0lzjjeget", ref: "Familia Santis Cerro", cupos: 4 },
  { id: "x63cfl0ukeyz7srcbpljd84u8", ref: "Abuelitos Margarita y Nelson", cupos: 2 },
  { id: "l8os9xtogn1w1ht7pze9viftt", ref: "Tia Lili y Juan", cupos: 2 },
  { id: "kkv9rftmttqlgzui1b0z3nx39", ref: "Nelson de Jesús Sanchez Estrada", cupos: 1 },
  { id: "rbsv55psq0oxfq8myx444nlz1", ref: "Sofia Santos", cupos: 1 },
  { id: "5bcw790pdw5py6b2knftu2gc5", ref: "Familia Bohorquez Camargo", cupos: 2 },
  { id: "9k9xjuy0bvr6k2vmwwyzx4w6x", ref: "Lora y Ale", cupos: 2 },
  { id: "0982n2atqyyv37dia5u6hc36k", ref: "Tia Blanca y Robert", cupos: 2 },
  { id: "dyt9moge4qxxva2ieuc1hh5lf", ref: "Tia Ledys", cupos: 1 },
  { id: "6a4fejgxaa2ilgb0s0r2sds8b", ref: "Tia Ninfa", cupos: 1 },
  { id: "25sq8croyr6ccvcjwtl9tqvdz", ref: "Tia Evelys y Primas", cupos: 3 },
  { id: "alunsga32nf2ovxu1cpeit8ws", ref: "German Calderon España y Familia", cupos: "libre" },
  { id: "10ea8ghmh5tms2blotot1ebkj", ref: "Laura Aguirre", cupos: 1 },
  { id: "9wi2rjfyv789f95avfwgp1whm", ref: "Jesus Aguirre", cupos: 1 },
  { id: "8wrhm0o6jqonah4t0qmbrilbv", ref: "Jorge Lozada", cupos: 1 },
  { id: "lu20q7n7tfal5lmrvtpbztfea", ref: "Glenda Nasser y Familia", cupos: 4 },
  { id: "5qzy3zlvtsarorg07h6do5bci", ref: "Carlos Santis Cerro", cupos: 2 },
  { id: "3qsydcjh36xsa42u787nzbzgc", ref: "Wadith Santis y Familia", cupos: 4 },
  { id: "zr0l0abg2geduzkkujo4xz0w0", ref: "Isabel Cerro y Familia", cupos: 3 },
  { id: "fcqepn167z2p8ja56n9p03i39", ref: "Isabel Cristina Cerro", cupos: 1 },
  { id: "i6rghi0fpdpmlslzp9p8lzf6a", ref: "Juan Monterroza y Familia", cupos: 2 },
  { id: "tigf3q1wbm6mynb1uds0rmdqs", ref: "Manuel Monterroza Simpson", cupos: 1 },
  { id: "nsppwzmrsbuq04mpapg4necjy", ref: "Marco Luis Santis", cupos: 2 },
  { id: "gg0mwhq3uvrp6criau2rc1gas", ref: "Ligia Gonzalez", cupos: 1 },
  { id: "lzlgomf02e727tq5lnc99bu6b", ref: "Hernan Velasquez", cupos: 1 },
  { id: "tpk3ct3wc6cyb3kzhoxkei46v", ref: "Juan y Angie", cupos: 2 },
];

/*
  El código que va en la URL es el id en base64 url-safe (- y _ en vez
  de + y /), para que ningún código rompa la dirección.
*/
export function codificar(id: string): string {
  return Buffer.from(id, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function buscarPorCodigo(codigo: string): Invitado | undefined {
  const normalizado = codigo.replace(/-/g, "+").replace(/_/g, "/");
  /*
    Buffer.from no falla con base64 inválido: devuelve bytes basura.
    Por eso no hace falta try/catch, el find simplemente no encuentra
    nada y se responde 404.
  */
  const id = Buffer.from(normalizado, "base64").toString("utf8");
  return INVITADOS.find((invitado) => invitado.id === id);
}
