cmake_minimum_required(VERSION 4.0)
project(invertedMessage C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(invertedMessage
        invertedMessage.c
        invertedMessage.h
        main.c)

# unit tests
add_executable(invertedMessage_tests
        test_invertedMessage.c
        invertedMessage.c
        invertedMessage.h
)
