import { ObserverCompetenceLevelDto } from 'src/app/modules/common-regobs-api';

/**
 * A competence option to use in checkbox forms.
 * Can contain multiple ids and descriptions if more than one geohazard are selected.
 */
export interface CompetenceOption {
  ids: ObserverCompetenceLevelDto['Id'][];
  name: ObserverCompetenceLevelDto['Name'];
  descriptions: ObserverCompetenceLevelDto['Description'][];
  checked: boolean;
}

/**
 * Groups ObserverCompetenceLevelDto by Name and Id.
 *
 * We group competence options by Name because we want to show one competence option per competence type,
 * eg, *, **, *** and so on, and not *, *, **, **, ... if more than one geohazard are selected.
 */
export class CompetenceOptions {
  idToItem = new Map<number, CompetenceOption>();
  nameToItem = new Map<string, CompetenceOption>();

  constructor(competenceList: ObserverCompetenceLevelDto[]) {
    this.addMany(competenceList);
  }

  add(competence: ObserverCompetenceLevelDto) {
    let competenceOption = this.nameToItem.get(competence.Name);
    if (!competenceOption) {
      competenceOption = {
        ids: [competence.Id],
        descriptions: [competence.Description],
        name: competence.Name,
        checked: false,
      };
    } else {
      // Add but filter out duplicates using a set
      competenceOption.ids = [...new Set([...competenceOption.ids, competence.Id])];
      competenceOption.descriptions = [...new Set([...competenceOption.descriptions, competence.Description])];
    }

    // Sikre at 0 id (ukjent) legges til i id listen når man velger ukjent kompetanse. Grunnen er fordi de nye
    // ukjente kompetanser på en obs lagres med id 0, ikke dedikerte ukjente per naturfare som 100, 200 700 og 600.
    if (competenceOption.ids.find((id) => id === 100 || id === 200 || id === 700 || id === 600)) {
      competenceOption.ids = [...new Set([...competenceOption.ids, 0])];
    }

    this.idToItem.set(competence.Id, competenceOption);
    this.nameToItem.set(competence.Name, competenceOption);
  }

  addMany(competenceList: ObserverCompetenceLevelDto[]) {
    for (const competence of competenceList) {
      this.add(competence);
    }
  }

  get options() {
    return [...this.nameToItem.values()];
  }
}
