describe("cifd test - javascript submit", () => {

	it("should be able to intercept formdata sent with XHR", () => {
		cy.visit("http://localhost:9991/cypress/test.html");

		cy.intercept("PUT", "http://test-server/upload", {
			statusCode: 200,
			body: {success: true}
		}).as("submitForm");

		cy.get("#first")
			.type("james");

		cy.get("#last")
			.type("bond");

		cy.get("#file")
			.attachFile("flower.jpg");

		cy.get("#submitFormJs")
			.click();

		cy.wait("@submitForm")
			.interceptFormData((formData) => {
				expect(formData["first"]).to.eq("james");
				expect(formData["last"]).to.eq("bond");
				expect(formData["file"]).to.eq("flower.jpg");
			});
	});
});
