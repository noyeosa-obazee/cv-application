class CV {
  constructor() {
    this.id = crypto.randomUUID();
    this.fullName = "";
    this.email = "";
    this.phoneNo = "";
    this.educations = [];
    this.experiences = [];
  }
}

class Education {
  constructor() {
    this.id = crypto.randomUUID();
    this.schoolName = "";
    this.degree = "";
    this.startDate = "";
    this.endDate = "";
  }
}

class Experience {
  constructor() {
    this.id = crypto.randomUUID();
    this.companyName = "";
    this.positionTitle = "";
    this.mainResponsibilities = "";
    this.startDate = "";
    this.endDate = "";
  }
}

export { CV, Education, Experience };
