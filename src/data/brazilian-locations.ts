export interface BrazilianState {
  uf: string;
  name: string;
  cities: string[];
}

export const brazilianStates: BrazilianState[] = [
  {
    uf: 'AC', name: 'Acre',
    cities: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó', 'Brasileia', 'Senador Guiomard', 'Plácido de Castro', 'Xapuri', 'Epitaciolândia']
  },
  {
    uf: 'AL', name: 'Alagoas',
    cities: ['Maceió', 'Arapiraca', 'Rio Largo', 'Palmeira dos Índios', 'União dos Palmares', 'Penedo', 'São Miguel dos Campos', 'Marechal Deodoro', 'Delmiro Gouveia', 'Coruripe']
  },
  {
    uf: 'AP', name: 'Amapá',
    cities: ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Mazagão', 'Porto Grande', 'Tartarugalzinho', 'Pedra Branca do Amapari', 'Vitória do Jari', 'Calçoene']
  },
  {
    uf: 'AM', name: 'Amazonas',
    cities: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari', 'Tefé', 'Tabatinga', 'Maués', 'Lábrea', 'Humaitá', 'São Gabriel da Cachoeira', 'Iranduba', 'Benjamin Constant', 'Autazes']
  },
  {
    uf: 'BA', name: 'Bahia',
    cities: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna', 'Juazeiro', 'Lauro de Freitas', 'Ilhéus', 'Jequié', 'Teixeira de Freitas', 'Barreiras', 'Alagoinhas', 'Porto Seguro', 'Simões Filho', 'Paulo Afonso', 'Eunápolis', 'Santo Antônio de Jesus', 'Valença', 'Candeias', 'Guanambi']
  },
  {
    uf: 'CE', name: 'Ceará',
    cities: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato', 'Itapipoca', 'Maranguape', 'Iguatu', 'Quixadá', 'Pacatuba', 'Aquiraz', 'Canindé', 'Russas', 'Tianguá', 'Crateús', 'Pacajus', 'Aracati']
  },
  {
    uf: 'DF', name: 'Distrito Federal',
    cities: ['Brasília']
  },
  {
    uf: 'ES', name: 'Espírito Santo',
    cities: ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Linhares', 'Cachoeiro de Itapemirim', 'Colatina', 'Guarapari', 'São Mateus', 'Aracruz', 'Viana', 'Nova Venécia', 'Barra de São Francisco']
  },
  {
    uf: 'GO', name: 'Goiás',
    cities: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Águas Lindas de Goiás', 'Valparaíso de Goiás', 'Trindade', 'Formosa', 'Novo Gama', 'Itumbiara', 'Senador Canedo', 'Catalão', 'Jataí', 'Planaltina']
  },
  {
    uf: 'MA', name: 'Maranhão',
    cities: ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias', 'Codó', 'Paço do Lumiar', 'Açailândia', 'Bacabal', 'Balsas', 'Santa Inês', 'Barra do Corda', 'Pinheiro', 'Chapadinha']
  },
  {
    uf: 'MT', name: 'Mato Grosso',
    cities: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Cáceres', 'Sorriso', 'Lucas do Rio Verde', 'Primavera do Leste', 'Barra do Garças', 'Alta Floresta', 'Nova Mutum']
  },
  {
    uf: 'MS', name: 'Mato Grosso do Sul',
    cities: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã', 'Naviraí', 'Nova Andradina', 'Aquidauana', 'Sidrolândia', 'Paranaíba', 'Maracaju']
  },
  {
    uf: 'MG', name: 'Minas Gerais',
    cities: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga', 'Sete Lagoas', 'Divinópolis', 'Santa Luzia', 'Ibirité', 'Poços de Caldas', 'Patos de Minas', 'Pouso Alegre', 'Teófilo Otoni', 'Barbacena', 'Sabará', 'Varginha', 'Conselheiro Lafaiete', 'Araguari', 'Itabira', 'Passos', 'Coronel Fabriciano']
  },
  {
    uf: 'PA', name: 'Pará',
    cities: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal', 'Parauapebas', 'Marituba', 'Abaetetuba', 'Cametá', 'Bragança', 'Tucuruí', 'Altamira', 'Tailândia', 'Barcarena', 'Itaituba']
  },
  {
    uf: 'PB', name: 'Paraíba',
    cities: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Sousa', 'Cabedelo', 'Cajazeiras', 'Guarabira', 'Sapé', 'Mamanguape']
  },
  {
    uf: 'PR', name: 'Paraná',
    cities: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo', 'Guarapuava', 'Paranaguá', 'Araucária', 'Toledo', 'Apucarana', 'Pinhais', 'Campo Largo', 'Almirante Tamandaré', 'Umuarama', 'Paranavaí', 'Piraquara', 'Cambé', 'Sarandi', 'Fazenda Rio Grande']
  },
  {
    uf: 'PE', name: 'Pernambuco',
    cities: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho', 'Camaragibe', 'Garanhuns', 'Vitória de Santo Antão', 'Igarassu', 'São Lourenço da Mata', 'Abreu e Lima', 'Serra Talhada', 'Araripina', 'Gravatá', 'Carpina']
  },
  {
    uf: 'PI', name: 'Piauí',
    cities: ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano', 'Barras', 'Campo Maior', 'União', 'Altos', 'Pedro II', 'José de Freitas', 'Oeiras']
  },
  {
    uf: 'RJ', name: 'Rio de Janeiro',
    cities: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Belford Roxo', 'São João de Meriti', 'Campos dos Goytacazes', 'Petrópolis', 'Volta Redonda', 'Magé', 'Itaboraí', 'Macaé', 'Mesquita', 'Nova Friburgo', 'Barra Mansa', 'Angra dos Reis', 'Cabo Frio', 'Maricá', 'Teresópolis', 'Nilópolis', 'Queimados', 'Resende', 'Araruama']
  },
  {
    uf: 'RN', name: 'Rio Grande do Norte',
    cities: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba', 'Ceará-Mirim', 'Caicó', 'Assu', 'Currais Novos', 'São José de Mipibu', 'Nova Cruz', 'Apodi']
  },
  {
    uf: 'RS', name: 'Rio Grande do Sul',
    cities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande', 'Alvorada', 'Passo Fundo', 'Sapucaia do Sul', 'Uruguaiana', 'Santa Cruz do Sul', 'Cachoeirinha', 'Bagé', 'Bento Gonçalves', 'Erechim', 'Guaíba', 'Lajeado', 'Ijuí', 'Sapiranga', 'Esteio']
  },
  {
    uf: 'RO', name: 'Rondônia',
    cities: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal', 'Jaru', 'Rolim de Moura', 'Guajará-Mirim', 'Ouro Preto do Oeste']
  },
  {
    uf: 'RR', name: 'Roraima',
    cities: ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Alto Alegre', 'Pacaraima', 'Cantá', 'Bonfim', 'Mucajaí']
  },
  {
    uf: 'SC', name: 'Santa Catarina',
    cities: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Chapecó', 'Criciúma', 'Itajaí', 'Jaraguá do Sul', 'Palhoça', 'Lages', 'Balneário Camboriú', 'Brusque', 'Tubarão', 'São Bento do Sul', 'Caçador', 'Concórdia', 'Camboriú', 'Navegantes', 'Rio do Sul', 'Araranguá', 'Gaspar', 'Biguaçu']
  },
  {
    uf: 'SP', name: 'São Paulo',
    cities: ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'São José dos Campos', 'Osasco', 'Ribeirão Preto', 'Sorocaba', 'Mauá', 'São José do Rio Preto', 'Mogi das Cruzes', 'Santos', 'Diadema', 'Jundiaí', 'Piracicaba', 'Carapicuíba', 'Bauru', 'Itaquaquecetuba', 'São Vicente', 'Franca', 'Praia Grande', 'Guarujá', 'Taubaté', 'Limeira', 'Suzano', 'Taboão da Serra', 'Sumaré', 'Barueri', 'Embu das Artes', 'Indaiatuba', 'Cotia', 'Americana', 'Marília', 'Araraquara', 'Jacareí', 'Hortolândia', 'Presidente Prudente', 'Rio Claro', 'Araçatuba', 'Ferraz de Vasconcelos', 'Santa Bárbara d\'Oeste', 'Francisco Morato', 'Itapecerica da Serra', 'Itu', 'Bragança Paulista', 'Pindamonhangaba', 'Itapevi', 'São Carlos', 'Mogi Guaçu', 'Franco da Rocha', 'Atibaia', 'Várzea Paulista', 'Catanduva', 'Sertãozinho', 'Botucatu', 'Valinhos', 'Assis', 'Leme', 'Ourinhos', 'Birigui', 'Jaú', 'Cubatão', 'Votorantim', 'Itatiba', 'Poá', 'Caraguatatuba']
  },
  {
    uf: 'SE', name: 'Sergipe',
    cities: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão', 'Estância', 'Tobias Barreto', 'Itabaianinha', 'Simão Dias', 'Capela']
  },
  {
    uf: 'TO', name: 'Tocantins',
    cities: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins', 'Colinas do Tocantins', 'Guaraí', 'Tocantinópolis', 'Dianópolis', 'Miracema do Tocantins']
  }
];
