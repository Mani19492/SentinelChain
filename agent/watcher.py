from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from entropy import calculate_entropy
from blockchain import report_infection
from config import ENTROPY_THRESHOLD, DEVICE_ID, WATCH_DIRECTORY
import time
import os

class FileWatcher(FileSystemEventHandler):

    def process(self, event):
        if event.is_directory:
            return

        try:
            with open(event.src_path, "rb") as f:
                data = f.read()

            entropy = calculate_entropy(data)

            print(f"📄 File: {event.src_path}")
            print(f"🔢 Entropy: {entropy}")

            if entropy > ENTROPY_THRESHOLD:
                print("⚠️ Possible ransomware detected!")
                report_infection(DEVICE_ID)

        except Exception as e:
            print("Error:", e)

    def on_created(self, event):
        self.process(event)

    def on_modified(self, event):
        self.process(event)


def start_watcher():
    observer = Observer()
    observer.schedule(FileWatcher(), WATCH_DIRECTORY, recursive=True)
    observer.start()

    print("👀 Watching folder:", WATCH_DIRECTORY)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()
