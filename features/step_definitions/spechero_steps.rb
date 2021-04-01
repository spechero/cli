require 'fileutils'
require 'tempfile'
require 'time'

include Aruba::Api::Commands

SPECHERO_BASE_DIR = './tmp/spechero_dirs'

def env
  @env ||= {
    'SPECHERO_EDITOR' => "touch #{editor_opened_filename}",
    'SPECHERO_START_CONTAINERS' => "touch #{docker_compose_launched_filename}"
  }
end

def editor_opened_filename
  @editor_opened_filename ||= DateTime.now.strftime('editor_opened_at_%s')
end

def docker_compose_launched_filename
  @docker_compose_launched_filename ||= DateTime.now.strftime('docker_compose_launched_at_%s')
end

Given('the spechero cli has been installed') do
  # TODO: make this npm link if spechero isn't already installed.
end

Given('{string} has no existing spechero specs') do |user|
  dir = spechero_dir(user)
  # double check we're not deleting the root directory
  expect(dir.split('/').count).to be > 2
  begin
    FileUtils.rm_r(dir)
  rescue StandardError
    nil
  end
end

When('{string} creates a spec called {string}') do |_string, _string2|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('a {string} spec is created from the {string} template and opens in his editor') do |spec_name, _template_name|
  directory = "#{specs_dir('bob')}/#{spec_name}"
  expect(Dir.exist?(directory)).to be_truthy
  expect(File.exist?("#{directory}/#{editor_opened_filename}")).to be_truthy
end

Then('a repo is created in his {string} spec with a {string} branch') do |spec, branch|
  directory = "#{specs_dir('bob')}/#{spec}"
  actual_branch = Dir.chdir(directory) do
    `git branch --show-current`.strip
  end
  expect(actual_branch).to eq(branch)
end

When('the containers to run his {string} spec are launched') do |spec|
  directory = "#{specs_dir('bob')}/#{spec}"
  expect(File.exist?("#{directory}/#{docker_compose_launched_filename}")).to be_truthy
end

When('{string} updates the {string} spec to describe his problem') do |_user, spec|
  file = "#{specs_dir('bob')}/#{spec}/ruby_app/spec/example_spec.rb"
  File.write(file, <<~SPEC)
    describe "Calc" do
      let(:calc) {Calc.new}

      it "adds numbers" do
        expect(calc.add(3, 5)).to eq(8)
      end
    end
  SPEC
end

Then('the spec {string} appears in the help wanted list') do |_string|
  pending # Write code here that turns the phrase above into concrete actions
end

When('he runs {string}') do |_command|
  step '"bob" runs "#{command}"'
end

When('{string} runs {string}') do |user, command|
  become user
  run command
end

Then('she should see the {string} spec') do |_string|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('the spec is cloned to her computer') do
  pending # Write code here that turns the phrase above into concrete actions
end

Then('a branch called {string} is created') do |_string|
  pending # Write code here that turns the phrase above into concrete actions
end

When('Mary runs {string}') do |_string|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('the spec runs on her computer and fails') do
  pending # Write code here that turns the phrase above into concrete actions
end

When('{string} updates the code to fix the problem') do |_string|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('the spec runs on her computer and passes') do
  pending # Write code here that turns the phrase above into concrete actions
end

When('she runs {string}') do |_string|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('{string} is notified that there is a solution to {string}') do |_string, _string2|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('he is told he needs to review and run {string}') do |_string|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('the spec runs on his computer and passes') do
  pending # Write code here that turns the phrase above into concrete actions
end

Then('{string} tag is created from the {string} commit and pushed') do |_string, _string2|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('{string} is notified that her spec has been accepted') do |_string|
  pending # Write code here that turns the phrase above into concrete actions
end

Then('the problem no longer appears on the help wanted page') do
  pending # Write code here that turns the phrase above into concrete actions
end

def become(user)
  env['SPECHERO_DIR'] = spechero_dir(user)
end

def spechero_dir(user)
  "#{SPECHERO_BASE_DIR}/#{user}"
end

def specs_dir(user)
  "#{spechero_dir(user)}/specs"
end

def run(command)
  @output_from_last_run = capture_stdout { system(env, command) }
  expect($?).to eq(0)
end

def capture_stdout
  stdout = $stdout.dup
  Tempfile.open 'stdout-redirect' do |temp|
    $stdout.reopen temp.path, 'w+'
    yield if block_given?
    $stdout.reopen stdout
    temp.read
  end
end
