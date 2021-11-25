require "selenium/webdriver"

#=============== Heroku setup ===============
# Heroku build packs need to put the chromedriver binary in a non-standard location specified by GOOGLE_CHROME_SHIM
chrome_bin = ENV.fetch("GOOGLE_CHROME_SHIM", nil)

chrome_opts = chrome_bin ? { "chromeOptions" => { "binary" => chrome_bin } } : {}

Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
    desired_capabilities: Selenium::WebDriver::Remote::Capabilities.chrome(chrome_opts),
  )
end

Capybara.javascript_driver = :chrome
#=============== Heroku setup ===============

Capybara.default_max_wait_time = 10

RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by(:rack_test)
  end

  config.before(:each, type: :system, js: true) do
    driven_by(:selenium_chrome_headless)
  end
end
