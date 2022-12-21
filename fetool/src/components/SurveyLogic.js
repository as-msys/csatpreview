const SurveyLogic = (filteredProjects, currentMonth, currentDay) => {
  const pendingProjects = filteredProjects.filter((value) => {
    if (
      value.attributes.survey_cadence.send_before > currentDay &&
      ((value.attributes.survey_cadence.survey_frequency === "Half_Yearly" &&
        currentMonth % 6 === 0) ||
        (value.attributes.survey_cadence.survey_frequency === "Quarterly" &&
          currentMonth % 3 === 0) ||
        value.attributes.survey_cadence.survey_frequency === "Monthly")
    ) {
      return value;
    }
  });
  return pendingProjects;
};

export default SurveyLogic;
