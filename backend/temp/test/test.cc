#include "gtest/gtest.h"
#include "src/solution.h"

#include <string>

TEST(Should, Return) {
    Solution solution;

    std::string expected = "Hello World!";
    std::string actual = solution.HelloWorld();

    EXPECT_EQ(expected, actual);
}