Feature: Specs can be outsourced

    Background:
        Given the spechero cli has been installed
        And "bob" has no existing spechero specs
        And "mary" has no existing spechero specs

    Scenario: An outsourced spec is solved successfully
        When "bob" runs "spechero new ruby-rspec calc"
        # Then a "calc" spec is created from the "ruby-rspec" template and opens in his editor
        And a repo is created in his "calc" spec with a "problem" branch
        And the containers to run his specs are launched
# When "bob" updates the "calc" spec to describe his problem
# And he runs "git add . && git commit -m 'problem'"
# And he runs "git push spechero"
# Then the spec "bob/calc" appears in the help wanted list

# When "mary" runs "spechero problems"
# Given then she should see the "bob/calc" spec
# When "mary" runs "spechero solve bob/calc"
# Then the spec is cloned to her computer
# And a branch called "solutions/mary" is created
# When Mary runs "spechero ok"
# Then the spec runs on her computer and fails

# When "mary" updates the code to fix the problem
# Then the spec runs on her computer and passes

# When she runs "git add . && git commit -m 'here is my solution'"
# And she runs "git push spechero"
# Then "bob" is notified that there is a solution to "calc"

# When "bob" runs "git checkout solutions/mary"
# Then he is told he needs to review and run "spechero ok"
# When he runs "spechero ok"
# Then the spec runs on his computer and passes

# When he runs "spechero accept"
# Then "solution" tag is created from the "mary" commit and pushed
# And "mary" is notified that her spec has been accepted
# And the problem no longer appears on the help wanted page
