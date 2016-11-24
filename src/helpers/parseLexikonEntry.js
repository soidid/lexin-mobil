const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const parseInflectionsVerb = (current) => {
    if( !current || !current.paradigm || !current.paradigm.inflection){
        return false;

    }else{
        
        // Infinitiv
        // Presens
        // Preteritum
        // Supinum
        // Imperativ
        if(current.paradigm.inflection.length === 5){
            return [
              'att ' + current.paradigm.inflection[3].value,
              current.paradigm.inflection[4].value,
              current.paradigm.inflection[0].value,
              'har ' + current.paradigm.inflection[1].value,
              current.paradigm.inflection[2].value + '!'
            ]
  
        }else{//Imperativ === Infinitiv
            return [
              'att '+ current.paradigm.inflection[2].value,
              current.paradigm.inflection[3].value,
              current.paradigm.inflection[0].value,
              'har ' + current.paradigm.inflection[1].value,
              current.paradigm.inflection[2].value + '!'
            ]
        }
    }
   
}

const parseEttEn = (bestamd) => {// Not every noun has this
    if(!bestamd) return '';

    let lastCharacter = bestamd.slice(-1);
    return (lastCharacter === 'n') ? 'en' : 'ett'; 
}

const parseInflections = (current) => { //Substantiv, Adjektiv
    if( !current || !current.paradigm || !current.paradigm.inflection){
        return [];
    }else{
        if(Array.isArray(current.paradigm.inflection)){
          return current.paradigm.inflection.map(inflection => inflection.value)
        }else{
          return [current.paradigm.inflection.value]
        } 
    }
}
const parseTranslation = (trans) => {
  if(Array.isArray(trans)){
    return trans.map(tran => tran.value)
  }else{
    return [trans.value,]
  } 
}
const parseExamples = (examples) => {
  if(examples){
     if(Array.isArray(examples)){
        return examples.map(ex => ({
          value: ex.value,
          translation: ex.translation ? decodeHtml(ex.translation.value) : ''
        }))

      }else{
        return [{
            value: examples.value,
            translation: examples.translation ? decodeHtml(examples.translation.value) : ''
          }]
     } 
    }else{

      return [];

    }

  
}
const parseLexikonEntry = (entry) => {
 
  switch(entry.class){
    case 'jj':
      return {
        category: 'adjektiv',
        translation: parseTranslation(entry.translation),
        inflections: parseInflections(entry),
        examples: parseExamples(entry.example)
      }

    case 'vb':
      return {
        category: 'verb',
        translation: parseTranslation(entry.translation),
        inflections: parseInflectionsVerb(entry),
        examples: parseExamples(entry.example)
      }

    case 'nn':
      return {
        category:'substantiv',
        translation: parseTranslation(entry.translation),
        inflections: parseInflections(entry),
        etten: parseEttEn(parseInflections(entry)[0]),
        examples: parseExamples(entry.example)
      }

    case 'ab':
      return {
        category:'adverb',
        translation: parseTranslation(entry.translation),
        inflections: [],
        examples: parseExamples(entry.example)
      }

    case 'pp':
      return {
        category: 'preposition',
        translation: parseTranslation(entry.translation),
        inflections: [],
        examples: parseExamples(entry.example)
      }

    case 'in':
      return {
        category: 'interjektion',
        translation: parseTranslation(entry.translation),
        inflections: [],
        examples: parseExamples(entry.example)
      }

    case 'ab':
      return {
        category: 'abbrev',
        translation: parseTranslation(entry.translation),
        inflections: [],
        examples: parseExamples(entry.example)
      }
  
    default:
      return {
        category: entry.class,
        translation: parseTranslation(entry.translation),
        inflections: [],
        examples: parseExamples(entry.example)
      }
  }

}
export default parseLexikonEntry

