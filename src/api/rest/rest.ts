const BITRIX24_WEBHOOK = "https://b24-1aju79.bitrix24.ru/rest/1/u3dtj4pacn8odm62/";
export default {
  async callApi(method: string, params = {}) {
    try {
      const response = await fetch(`${BITRIX24_WEBHOOK}${method}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(params),
      });
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error_description || result.error);
      }
      return result.result;
    } catch (error) {
      console.error(`Ошибка при вызове метода ${method}:`, error);
      throw error;
    }
  },

  async getAvailableMethods() {
    return this.callApi("methods");
  },

  async getProfile() {
    return this.callApi("profile");
  },

  async getAppInfo() {
    return this.callApi("app.info");
  },

  async getAdminInfo() {
    return this.callApi("user.admin");
  },

  async getAccessInfo() {
    return this.callApi("user.access");
  },

  async getDeals(params: {}) {
    return this.callApi("crm.deal.list", params);
  },

  async getChats() {
    return this.callApi("im.recent.list");
  },

  async getPosts() {
    return this.callApi("log.blogpost.get");
  },


  async postBlogPost(params: {}) {
    return this.callApi("log.blogpost.add", params);
  },

  async postDeal(params: {}) {
    return this.callApi("crm.deal.add", params);
  },

  async postComment(params: {}) {
    return this.callApi("log.blogcomment.add", params);
  },

  async postCalendar(params: {}) {
    return this.callApi("calendar.section.add", params);
  },

  async deleteDeal(id: number) {
    return this.callApi("crm.deal.delete", {id});
  },

  async deletePost(id: number) {
    return this.callApi("log.blogpost.delete", {"POST_ID": id});
  },

  async deleteCalendar(params: {}) {
    return this.callApi("calendar.section.delete", params);
  },

  async deleteAllDeals() {
    const deals = await this.getDeals({ select: ["ID"] });
    const dealIds = deals.map((deal: { ID: number }) => deal.ID);
    return await Promise.all(dealIds.map((dealId: number) => {
      this.callApi("crm.deal.delete", { id: dealId }).then((result) => result.error ? null : dealId)
    }));
  }

}