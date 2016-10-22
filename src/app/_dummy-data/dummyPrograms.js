angular
  .module('app')
  .factory('dummyPrograms', makedummyPrograms);

function makedummyPrograms() {
    let dummyPrograms = {};

    dummyPrograms.programs = [
        {
            title: 'ADULT BASIC EDUCATION, GED AND FAST TRACK GED',
            id: 1,
            description: 'Adult Basic Education/General Education Development (GED) and Fast Track GED components help to enhance the long-term employment options of clients and improve their chances of entering college or a trade school. The Adult Basic Education and GED programs correspond with St. Patrick Center’s one-stop design, which allows clients to access all the services they need to become financially stable and permanently housed. In the Fast Track GED program, clients receive 20 weeks of instruction facilitated by St. Louis Community College.',
            category: 'housing',
            clientCounts: {
                active: 20,
                success: 120,
                leads: 3
            }
        },
        {
            title: 'ASSERTIVE COMMUNITY TREATMENT',
            id: 1,
            description: 'Assertive Community Treatment is an evidence-based practice with the goals of reducing hospitalization days, contact with law enforcement and homelessness, and treating substance abuse. These goals are achieved by meeting the individual client “where he or she is.”',
            category: 'health',
            clientCounts: {
                active: 20,
                success: 120,
                leads: 3
            }
        }
    ];

    return dummyPrograms;
}
