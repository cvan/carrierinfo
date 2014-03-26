NAME = "carrierinfo"
TMP = _tmp
VERSION = $(shell date "+%Y.%m.%d")
VERSION_INT = $(shell date "+%Y%m%d%H%M%S")

zip:
	@mkdir -p $(TMP) && cp -pR src/ $(TMP)/.
	@# We have to have a temp file to work around a bug in Mac's version of sed :(
	@sed -i'.bak' -e 's/{version}/$(VERSION)/g' $(TMP)/index.html
	@sed -i'.bak' -e 's/{version_int}/$(VERSION_INT)/g' $(TMP)/manifest.webapp
	@rm -f $(TMP)/*.bak
	@cd $(TMP) && zip -q -r ../$(NAME)_$(VERSION_INT).zip * && cd ../
	@rm -rf $(TMP)
	@echo "Created file: $(NAME)_$(VERSION_INT).zip"

submit:
	@open 'https://marketplace.firefox.com/developers/app/carrier-info/status#upload-new-version'

approve:
	@open 'https://marketplace.firefox.com/reviewers/apps/review/carrier-info#review-actions'
