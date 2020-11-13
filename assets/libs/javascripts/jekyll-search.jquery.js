(function () {
    $.fn.simpleJekyllSearch = function (options) {
        let settings = options;

        let jsonData = [],
            origThis = this,
            searchResults = $(settings.searchResults),
            matches = [];

        if (settings.jsonFile.length && searchResults.length) {
            $.ajax({
                type: "GET",
                url: settings.jsonFile,
                dataType: 'json',
                success: function (data) {
                    jsonData = data;
                    registerEvent();
                },
                error: function (x, y, z) {
                }
            });
        }

        function registerEvent() {
            origThis.keyup(function (e) {
                let key = e.key;
                if ('Enter' === key) {
                    if (matches) {
                        window.location = matches[0].url;
                    }
                }
                if ($(this).val().length) {
                    writeMatches(performSearch($(this).val()));
                } else {
                    clearSearchResults();
                }
            });
        }

        function performSearch(str) {
            matches = [];
            for (let i = 0; i < jsonData.length; i++) {
                let obj = jsonData[i];
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (obj[key] instanceof Array) {
                            for (let j = 0; j < obj[key].length; j++) {
                                if (obj[key][j].toLowerCase().indexOf(str.toLowerCase()) >= 0) {
                                    matches.push(obj);
                                    break;
                                }
                            }
                        } else if (obj[key].toLowerCase().indexOf(str.toLowerCase()) >= 0) {
                            matches.push(obj);
                            break;
                        }
                    }
                }
            }
            return matches;
        }

        function writeMatches(m) {
            clearSearchResults();
            searchResults.append($(settings.searchResultsTitle));
            let output;
            if (m && m.length) {
                for (let i = 0; i < m.length && i < settings.limit; i++) {
                    let obj = m[i];
                    output = settings.template;
                    output = output.replace(/\{(.*?)\}/g, function (match, property) {
                        return obj[property];
                    });
                    searchResults.append($(output));
                }
            } else {
                searchResults.append(settings.noResults);
            }
        }

        function clearSearchResults() {
            searchResults.children().remove();
        }
    }
}(jQuery));