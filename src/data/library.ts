import type { LibraryKind, LibraryResource } from '../types'

export const libraryKindLabels: Record<LibraryKind, string> = {
  bases: 'Bases de datos',
  bibliotecas: 'Bibliotecas virtuales',
  abierto: 'Acceso abierto',
  revistas: 'Revistas UPS',
  fondos: 'Fondos externos',
  patentes: 'Propiedad intelectual',
}

const r = (name: string, href: string, kind: LibraryKind, description: string): LibraryResource => ({ name, href, kind, description })

// Recursos de los acordeones de la portada original (antes: más de 50 logos en base64).
export const libraryResources: LibraryResource[] = [
  r('Web of Science', 'https://upsalesiana.ec/bdwebofscience', 'bases', 'Citas e índices de impacto multidisciplinarios'),
  r('Scopus', 'https://upsalesiana.ec/bdscopus', 'bases', 'Resúmenes y citas de literatura revisada por pares'),
  r('SciELO', 'https://upsalesiana.ec/bdscielo', 'bases', 'Revistas científicas de Iberoamérica'),

  r('ScienceDirect', 'https://upsalesiana.ec/bvsciencedirect', 'bibliotecas', 'Revistas y libros de Elsevier'),
  r('Taylor & Francis', 'https://upsalesiana.ec/bvtaylorfrancis', 'bibliotecas', 'Humanidades, ciencias sociales y tecnología'),
  r('Springer', 'https://upsalesiana.ec/bvspringer', 'bibliotecas', 'Revistas y libros científicos'),
  r('Wiley', 'https://portal.ups.edu.ec/wiley', 'bibliotecas', 'Publicaciones académicas y profesionales'),
  r('IEEE Xplore', 'https://upsalesiana.ec/bvieee', 'bibliotecas', 'Ingeniería eléctrica, electrónica y computación'),
  r('Sage Journals', 'https://journals.sagepub.com/', 'bibliotecas', 'Ciencias sociales y salud'),
  r('ProQuest', 'https://upsalesiana.ec/bvproquest', 'bibliotecas', 'Tesis, periódicos y revistas'),
  r('Ebrary', 'https://upsalesiana.ec/bvebrary', 'bibliotecas', 'Libros electrónicos académicos'),
  r('e-Libro', 'https://upsalesiana.ec/bvelibro', 'bibliotecas', 'Libros electrónicos en español'),
  r('EBSCO eBooks', 'https://upsalesiana.ec/bvebscoebooks', 'bibliotecas', 'Colección de libros electrónicos'),
  r('EBSCO Discovery Service', 'https://upsalesiana.ec/bvebscodiscovery', 'bibliotecas', 'Buscador unificado de recursos'),
  r('ACM Digital Library', 'https://upsalesiana.ec/bvacmlibrary', 'bibliotecas', 'Computación y sistemas de información'),
  r('SPORTDiscus', 'https://upsalesiana.ec/sportdiscus', 'bibliotecas', 'Deporte y medicina deportiva'),
  r('PubMed', 'https://login.ecups.idm.oclc.org/login?url=https://pubmed.ncbi.nlm.nih.gov/', 'bibliotecas', 'Biomedicina y ciencias de la vida'),
  r('Magisterio Editorial', 'https://upsalesiana.ec/magisterioed', 'bibliotecas', 'Educación y pedagogía'),
  r('vLex', 'https://upsalesiana.ec/vlex', 'bibliotecas', 'Información jurídica'),
  r('Virtualex', 'https://upsalesiana.ec/bvvirtualex', 'bibliotecas', 'Legislación ecuatoriana'),
  r('ODUCAL', 'https://upsalesiana.ec/bvoducal', 'bibliotecas', 'Universidades católicas de América Latina'),
  r('Gale', 'https://login.ecups.idm.oclc.org/login?url=https://link.gale.com/apps/menu?u=ups_cons', 'bibliotecas', 'Referencia académica multidisciplinaria'),
  r('SAE Mobilus', 'https://upsalesiana.ec/saeint', 'bibliotecas', 'Ingeniería automotriz y aeroespacial'),

  r('MDPI', 'https://upsalesiana.ec/bvamdpi', 'abierto', 'Revistas científicas de acceso abierto'),
  r('PLOS', 'https://upsalesiana.ec/bvaplos', 'abierto', 'Ciencia y medicina en acceso abierto'),
  r('Hindawi', 'https://upsalesiana.ec/bvahindawi', 'abierto', 'Revistas revisadas por pares'),
  r('IET', 'https://upsalesiana.ec/bvietsp', 'abierto', 'Ingeniería y tecnología'),
  r('Frontiers', 'https://login.ecups.idm.oclc.org/login?url=https://www.frontiersin.org', 'abierto', 'Ciencia abierta multidisciplinaria'),
  r('ComVoMujer', 'https://login.ecups.idm.oclc.org/login?url=https://comvomujer.org', 'abierto', 'Prevención de la violencia contra las mujeres'),

  r('Retos', 'https://revistas.ups.edu.ec/index.php/retos/search/search', 'revistas', 'Ciencias de la administración y economía'),
  r('Sophia', 'https://revistas.ups.edu.ec/index.php/sophia/search/search', 'revistas', 'Filosofía de la educación'),
  r('La Granja', 'https://revistas.ups.edu.ec/index.php/granja/search/search', 'revistas', 'Ciencias de la vida'),
  r('Ingenius', 'https://revistas.ups.edu.ec/index.php/ingenius/search/search', 'revistas', 'Ciencia y tecnología'),
  r('Alteridad', 'https://revistas.ups.edu.ec/index.php/alteridad/search/search', 'revistas', 'Educación'),
  r('Universitas', 'https://revistas.ups.edu.ec/index.php/universitas/search/search', 'revistas', 'Ciencias sociales y humanas'),

  r('Pivot', 'https://pivot.proquest.com/', 'fondos', 'Convocatorias de financiamiento'),
  r('Overton', 'https://login.ecups.idm.oclc.org/login?url=http://app.overton.io', 'fondos', 'Documentos de políticas públicas'),
  r('SciVal', 'https://login.ecups.idm.oclc.org/login?url=https://www.scival.com/', 'fondos', 'Análisis del desempeño en investigación'),

  r('Lens', 'https://upsalesiana.ec/pilens', 'patentes', 'Patentes y literatura académica'),
  r('OMPI', 'https://upsalesiana.ec/piwipo', 'patentes', 'Organización Mundial de la Propiedad Intelectual'),
  r('IPC CAT', 'https://upsalesiana.ec/pipcat', 'patentes', 'Clasificación internacional de patentes'),
  r('USPTO Global Dossier', 'https://upsalesiana.ec/piglobaldossier', 'patentes', 'Expedientes de patentes'),
  r('Espacenet', 'https://upsalesiana.ec/piespacenet', 'patentes', 'Base europea de patentes'),
  r('Google Patents', 'https://upsalesiana.ec/pigooglepatent', 'patentes', 'Buscador de patentes'),
]
