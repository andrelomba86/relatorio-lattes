export const searchKeys = {
  'CURRICULO-VITAE': {
    'PRODUCAO-BIBLIOGRAFICA': {
      0: {
        'ARTIGOS-PUBLICADOS': {
          Sheet: {
            Name: 'Artigos publicados',
          },
          0: {
            'ARTIGO-PUBLICADO': {
              MultipleData: true,
              0: {
                AUTORES: {
                  Column: 'Autores',
                },
                'DADOS-BASICOS-DO-ARTIGO': {
                  0: {
                    $: {
                      'ANO-DO-ARTIGO': {
                        Column: 'Ano',
                      },
                      'TITULO-DO-ARTIGO': {
                        Column: 'Título',
                      },
                      'PAIS-DE-PUBLICACAO': {
                        Column: 'País',
                      },
                      IDIOMA: {
                        Column: 'Idioma',
                      },
                      NATUREZA: {
                        Column: 'Natureza',
                      },
                    },
                  },
                },
                'DETALHAMENTO-DO-ARTIGO': {
                  0: {
                    $: {
                      'TITULO-DO-PERIODICO-OU-REVISTA': {
                        Column: 'Periódico/Revista',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        'TRABALHOS-EM-EVENTOS': {
          Sheet: {
            Name: 'Trabalhos em eventos',
          },

          0: {
            'TRABALHO-EM-EVENTOS': {
              MultipleData: true,
              0: {
                AUTORES: {
                  Column: 'Autores',
                },
                'DADOS-BASICOS-DO-TRABALHO': {
                  0: {
                    $: {
                      'ANO-DO-TRABALHO': {
                        Column: 'Ano',
                      },

                      'TITULO-DO-TRABALHO': {
                        Column: 'Título',
                      },
                      NATUREZA: {
                        Column: 'Natureza',
                      },
                    },
                  },
                },
                'DETALHAMENTO-DO-TRABALHO': {
                  0: {
                    $: {
                      'NOME-DO-EVENTO': {
                        Column: 'Evento',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        'LIVROS-E-CAPITULOS': {
          Sheet: { Name: 'Livros e capítulos' },
          0: {
            'LIVROS-PUBLICADOS-OU-ORGANIZADOS': {
              0: {
                'LIVRO-PUBLICADO-OU-ORGANIZADO': {
                  MultipleData: true,
                  0: {
                    AUTORES: { Column: 'Autores' },
                    'DADOS-BASICOS-DO-LIVRO': {
                      0: {
                        $: {
                          ANO: { Column: 'Ano' },
                          NATUREZA: { Column: 'Natureza' },
                          TIPO: { Column: 'Tipo' },
                          'TITULO-DO-LIVRO': { Column: 'Título do Livro' },
                          IDIOMA: { Column: 'Idioma' },
                          // #UNDEFINED - 'hack' para incluir colunas do item CAPITULOS-DE-LIVROS-PUBLICADOS que não estão em LIVRO-PUBLICADO-OU-ORGANIZADO'
                          '#UNDEFINED1': { Column: 'Título do Capítulo' },
                        },
                      },
                    },
                  },
                },
              },
            },
            'CAPITULOS-DE-LIVROS-PUBLICADOS': {
              0: {
                'CAPITULO-DE-LIVRO-PUBLICADO': {
                  MultipleData: true,
                  0: {
                    AUTORES: { Column: 'Autores' },
                    'DADOS-BASICOS-DO-CAPITULO': {
                      0: {
                        $: {
                          ANO: { Column: 'Ano' },
                          TIPO: { Column: 'Tipo' },
                          NATUREZA: { Column: 'Natureza' },
                          'TITULO-DO-CAPITULO-DO-LIVRO': {
                            Column: 'Título do Capítulo',
                          },
                          IDIOMA: { Column: 'Idioma' },
                        },
                      },
                    },
                    'DETALHAMENTO-DO-CAPITULO': {
                      0: {
                        $: {
                          'TITULO-DO-LIVRO': { Column: 'Título do Livro' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        'TEXTOS-EM-JORNAIS-OU-REVISTAS': {
          Sheet: { Name: 'Textos em jornais ou revistas' },
          0: {
            'TEXTO-EM-JORNAL-OU-REVISTA': {
              MultipleData: true,
              0: {
                AUTORES: {
                  Column: 'Autores',
                },
                'DADOS-BASICOS-DO-TEXTO': {
                  0: {
                    $: {
                      NATUREZA: 'Natureza',
                      'TITULO-DO-TEXTO': { Column: 'Título' },
                      'ANO-DO-TEXTO': { Column: 'Ano' },
                      IDIOMA: { Column: 'Idioma' },
                    },
                  },
                },

                'DETALHAMENTO-DO-TEXTO': {
                  0: {
                    $: {
                      'TITULO-DO-JORNAL-OU-REVISTA': {
                        Column: 'Título do jornal ou revista',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        'DEMAIS-TIPOS-DE-PRODUCAO-BIBLIOGRAFICA': {
          Sheet: { Name: 'Demais produções bibliograficas' },
          0: {
            'OUTRA-PRODUCAO-BIBLIOGRAFICA': {
              MultipleData: true,
              0: {
                AUTORES: {
                  Column: 'Autores',
                },
                'DADOS-BASICOS-DE-OUTRA-PRODUCAO': {
                  0: {
                    $: {
                      NATUREZA: { Column: 'Natureza' },
                      TITULO: { Column: 'Título' },
                      ANO: { Column: 'Ano' },
                      IDIOMA: { Column: 'Idioma' },
                    },
                  },
                },
                'DETALHAMENTO-DE-OUTRA-PRODUCAO': {
                  0: {
                    $: {
                      EDITORA: { Column: 'Editora' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    // 'PRODUCAO-TECNICA': {
    //   0: {
    //     Sheet: { Name: 'Produção técnica' },
    //     SOFTWARE: {
    //       MultipleData: true,
    //       0: {
    //         $: {
    //           NATUREZA: { Column: 'Natureza' },
    //           'TITULO-DO-SOFTWARE': { Column: 'Título' },
    //         },
    //       },
    //     },
    //   },
    // },
  },
}

export const columnsOrders = {
  'Trabalhos em eventos': [
    'Docente',
    'Ano',
    'Autores',
    'Título',
    'Natureza',
    'País',
    'Evento',
  ],
  'Artigos publicados': [
    'Docente',
    'Ano',
    'Autores',
    'Título',
    'Natureza',
    'Periódico/Revista',
    // 'País',
    'Idioma',
  ],
  'Livros e capítulos': [
    'Docente',
    'Ano',
    'Autores',
    'Título do Livro',
    'Título do Capítulo',
    'Idioma',
    'Tipo',
    'Natureza',
  ],
  'Textos em jornais ou revistas': [
    'Docente',
    'Ano',
    'Autores',
    'Título',
    'Título do jornal ou revista',
    'Idioma',
  ],
  'Demais produções bibliograficas': [
    'Docente',
    'Ano',
    'Autores',
    'Natureza',
    'Título',
    'Editora',
    'Idioma',
  ],
}
