<Dialog
  open={!!selectedPlaylist}
  onOpenChange={() => setSelectedPlaylist(null)}
>
  <DialogContent className="max-w-md mx-auto rounded-xl p-6">
    {selectedPlaylist && (
      <div className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            {selectedPlaylist.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
          {selectedPlaylist.tracks.map((name, index) => (
            <div
              key={index}
              className="flex justify-between p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>;
