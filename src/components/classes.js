class CV {
  constructor() {
    this.id = crypto.randomUUID();
    this.fullName = "";
    this.email = "";
    this.phoneNo = "";
    this.educations = [];
    this.experiences = [];
    this.links = [];
    this.requiredFields = ["fullName", "email", "phoneNo"];
  }
}

class Education {
  constructor() {
    this.id = crypto.randomUUID();
    this.schoolName = "";
    this.titleOfStudy = "";
    this.degree = "";
    this.startDate = "";
    this.endDate = "Present";
  }
}

class Experience {
  constructor() {
    this.id = crypto.randomUUID();
    this.companyName = "";
    this.positionTitle = "";
    this.mainResponsibilities = "";
    this.startDate = "";
    this.endDate = "Present";
  }
}

class Link {
  constructor() {
    this.id = crypto.randomUUID();
    this.label = "";
    this.url = "";
  }
}

export { CV, Education, Experience, Link };
